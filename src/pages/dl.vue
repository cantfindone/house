<template>
  <b-container fluid>
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="panel panel-default justify-content-sm-center">
            
          
            <div class="panel-body">
              <form @submit.prevent="validate" method="post" class="needs-validation form-horizontal" novalidate>
                <div class="form-group">
                  <label class=" control-label">用户名：</label>
                  <div class="">
                    <input  class="form-control " placeholder="用户名" v-model="user._id" required>
                    <div class="invalid-feedback">
                      {{msg}} 
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">密码：</label>
                  <div class="">
                    <input class="form-control" type="password" placeholder="密码" v-model='user.password' required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="">
                    <button type="submit" class="btn btn-primary ">登录</button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  </b-container>
</template>

<script>

// var axios = require("axios");

// window.x=axios
// console.log("window.ax:",window.x.defaults)
export default {
  data: function() {
    return {
      //items: items,
      msg: "d",
      user: {
        _id: "",
        password: ""
      }
    };
  },
  computed: {},
  methods: {
    validate: function(e) {
      if (e.target.checkValidity()) {
        this.submit(e.target);
      } else {
        e.target.classList.add("was-validated");
      }
    },
    submit: function(form) {
      var formData = JSON.stringify(this.user); // 这里才是你的表单数据
      //console.log(formData);
      window.x.post("/auth/signin", this.user).then(
        response => {
          localStorage.setItem('u',JSON.stringify(response.data))
          localStorage.setItem('tk','Bearer '+response.data.tk)
          //window.x.defaults.headers.authorization='Bearer '+response.data.tk
          window.u=response.data
          this.$router.push('/')
          console.log(response)
        },
        response => {
          // console.log(form);
          // console.log(form.getElementsByClassName("form-control")[0].classList);
          form
            .getElementsByClassName("form-control")[0]
            .classList.add("is-invalid");
          this.msg =response.response.data //"服务器异常";
        }
      );
    }
  }
};
</script>

<!-- table-complete-1.vue -->