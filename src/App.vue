<template>
  <div id="app">
    <div>
  <b-navbar type="dark" variant="secondary" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="#/">首页</b-nav-item>
        <b-nav-item v-show="zy()" href="#/zy">中药</b-nav-item>
        <b-nav-item v-show="ys()" href="#/ys">医生</b-nav-item> 
        <b-nav-item v-show="user()" href="#/list_admin">管理员</b-nav-item> 
        <!-- <b-nav-item href="#/br">病人</b-nav-item>
        <b-nav-item href="#/bl">病历</b-nav-item> 		 -->
        <b-nav-item v-show="!on()" href="#/dl">登录</b-nav-item> 		
        <b-nav-item v-show="on()" href="#" @click="logout">退出</b-nav-item> 		
        <!-- <b-nav-item-dropdown v-show="user()" text="用户" left>
          <b-dropdown-item href="#/list_admin">管理员</b-dropdown-item>
          <b-dropdown-item href="#/reg_ys">医生</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  methods: {
    zy:function(){
      let user=window.u||JSON.parse(sessionStorage.getItem('u'))
      if(!user){return false}
      console.log(user)
      return user.asst.includes('herb')
    },
    ys:function(){
      let user=window.u||JSON.parse(sessionStorage.getItem('u'))
      if(!user){return false}
      console.log(user)
      return user.asst.includes('doctor')
    },
    user:function(){
      let user=window.u||JSON.parse(sessionStorage.getItem('u'))
      if(!user){return false}
      console.log(user)
      return user.asst.includes('user')
    },
    logout:function(){
      window.u=null
      sessionStorage.clear()     
      this.$router.push('/tc')
    },
 
    on:function(){
      let user=window.u||JSON.parse(sessionStorage.getItem('u'))
      if(!user){return false}     
      return true
    }
 
  }
};
</script>

<style>
.btn-primary {
  color: #fff;
  background-color: #607d8b;
  border-color: #607d8b;
}

.page-item.active .page-link {
  background-color: #607d8b;
  border-color: #607d8b;
}

.page-link {
  color: #607d8b;
}
</style>
