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
                    <input  class="form-control " placeholder="用户名" @input='input' v-model="user._id" required>
                    <div class="invalid-feedback">
                      {{msg}} 
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class=" control-label">姓名</label>
                  <div class="">
                    <input  class="form-control " placeholder="姓名" v-model="user.name" required>
                    <div class="invalid-feedback">
                      {{msg}} 
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">密码：</label>
                  <div class="">
                    <input class="form-control"  placeholder="密码" v-model='user.password' required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="">
                    <button type="submit" class="btn btn-primary ">注册</button>
                  </div>
                </div>
                <div class="alert alert-success" v-show="created" role="alert">注册成功</div>
              </form>
            
            <div>
            
          
                <!-- Modal Component -->
                <b-modal v-model="created" @hide='reset' size="sm" hide-footer header-class="bg-dark text-light  " id="modal-center" centered title="注册成功">
                  <p class="my-4">{{user.name}}</p>
                </b-modal>
              

            </div>
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
      created:false,
      msg: "",
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
      console.log(formData);
      window.x.post("/api/reg/admin", this.user).then(
        response => {
         
         // this.$router.push("/");
          console.log(response);
          this.created=true;
        },
        response => {
          console.log(response);
          //console.log(form.getElementsByClassName("form-control")[0].classList);
          form
            .getElementsByClassName("form-control")[0]
            .classList.add("is-invalid");
          this.msg = response.response.data
        }
      );
    },
    reset: function(){
          this.user._id='';
          this.user.name='';
          this.user.password='';

    },
    input: function(e){
      e.target.classList.remove("is-invalid")
    }
  }
};
</script>

<!-- table-complete-1.vue -->