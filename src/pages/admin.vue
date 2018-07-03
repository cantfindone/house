<template>
  <b-container fluid>
  <div class="page-header">
    <p class=" h4  text-center text-secondary">{{$route.name}}</p>
  </div>
    <!-- User Interface controls -->
	<b-row class="form-inline">
      <b-col md='4'  class="">
        <b-form-group horizontal label="姓名" class="text-sm-left">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="姓名" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">清空</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
     

      <b-col md='4' sm='12' class="">
        <b-form-group horizontal label="每页行数" class="text-sm-left">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>

      <b-col md='4' class="">
        <b-form-group horizontal label="" class="text-sm-right">
              <b-btn  variant="outline-dark" size='md' @click="$router.push('/reg_admin')">新建管理员</b-btn>
          
        </b-form-group>
      </b-col>


    </b-row>
    <!-- Main table element -->
    <b-table id='my-table'
    show-empty
    class="table-striped table-hover table-condensed"
             stacked="md"             
			 :busy.sync="isBusy"
			 :items="myProvider"
			 :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"             
             @filtered="onFiltered"
    >
     

	  <template slot="x" slot-scope="row">
	   <b-button size="sm" @click.stop="remove(row, row.index, $event.target)">
          删除
        </b-button>
	  
      </template>
      
    </b-table>

    <b-row>
      <b-col sm="12" class="">
        <b-pagination align="center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
	<!-- Info modal -->
	<b-modal id="modalInfo" @hide="resetModal"
             :title="modalInfo.title"
			 size="lg"
              ok-title="取消"
              cancel-title="删除"
              @cancel="doRemove"
             header-class="bg-dark text-light"             
             body-class="bg-light text-dark"             
			 footer-class="bg-light text-light">
       <b-container fluid>
         <b-row class="mb-1">           
           <b-col>用户名</b-col>
           <b-col>{{modalInfo.user._id}}</b-col>
         </b-row>
         <b-row class="mb-1">
           <b-col >姓名</b-col>
           <b-col>{{modalInfo.user.name}}</b-col>           
         </b-row>
         
       </b-container>
		
    </b-modal>

   
  </b-container>
</template>

<script>
var axios = require("axios");

export default {
  data() {
    return {
      //items: items,
      fields: [
        { key: "_id", label: "用户名" },
        { key: "name", label: "姓名" },

        { key: "x", label: "操作", class: "right" }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 20],
      totalRows: 0,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      isBusy: false,
      filter: null,
      modalInfo: { title: "删除", user: { _id: "", name: "" } }
    };
  },
  computed: {},
  methods: {
    myProvider(ctx) {
      console.log("filter:", ctx.filter);
      let promise = axios.get(
        "/api/ins/user?prv=2&start=" +
          (ctx.currentPage - 1) * ctx.perPage +
          "&count=" +
          ctx.perPage +
          (ctx.filter ? "&reg_name=" + ctx.filter : "")
      );

      // Must return a promise that resolves to an array of items
      return promise.then(data => {
        // Pluck the array of items off our axios response
        let items = data.data.data;
        this.totalRows = data.data.size;
        // Must return an array of items or an empty array if an error occurred
        return items || [];
      });
    },
    remove(item, index, button) {
      //console.log(item.item.name)
      this.modalInfo.user = item.item;
      this.$root.$emit("bv::show::modal", "modalInfo", button);
    },
    doRemove() {
      console.log(this.modalInfo);
      window.x.get("/api/ins/user/del/" + this.modalInfo.user._id).then(d => {
        this.$root.$emit("bv::refresh::table", "my-table");
        console.log(d);
      });
    },
    resetModal() {
      this.modalInfo.title = "删除";
      this.modalInfo.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<!-- table-complete-1.vue -->