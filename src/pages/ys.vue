<template>
  <b-container fluid>
    <!-- User Interface controls -->
	<b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="姓名" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="姓名" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">清空</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
     

      <b-col md="6" class="my-1">
        <b-form-group horizontal label="每页行数" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
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
	   <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? '更少' : '更多' }}
        </b-button>
	  
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col sm="12" class="my-1">
        <b-pagination align="center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
	<!-- Info modal -->
	<b-modal id="modalInfo" @hide="resetModal"
             :title="modalInfo.name"
			 size="lg"
			 ok-only
             header-class="bg-dark text-light"             
             body-class="bg-light text-dark"             
			 footer-class="bg-light text-light">
       <b-container fluid>
         <b-row class="mb-1 text-center">
           <b-col cols="3"> </b-col>
           <b-col>Background</b-col>
           <b-col>Text</b-col>
         </b-row>
         <b-row class="mb-1">
           <b-col cols="2">Header</b-col>
           <b-col>{{modalInfo.professional}}</b-col>           
         </b-row>
         
       </b-container>
		
    </b-modal>

   
  </b-container>
</template>

<script>
var axios = require("axios");


export default {
  data () {
    return {
      //items: items,
	  fields: [
		{ key: 'name', label: '姓名'},
        { key: 'spec', label: '专长', 'class': 'text-center' },
        { key: 'hos', label: '医院'},
		{ key:'x',label:''}
	   ],
	  currentPage: 1,
      perPage: 10,
      pageOptions: [ 5, 10, 20 ],
	  totalRows:0,
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      isBusy: false,
      filter: null,
      modalInfo: { title: '', content: '' }
	  
    }
  },
  computed: {
    
  },
  methods: {
	myProvider (ctx) {
		console.log('filter:',ctx.filter)
	  let promise = axios.get('/api/ins/doctorExt?start='+(ctx.currentPage-1)*ctx.perPage+'&count='+ctx.perPage+(ctx.filter?'&reg_name='+ctx.filter:''))

	  // Must return a promise that resolves to an array of items
	  return promise.then((data) => {
		// Pluck the array of items off our axios response
		let items = data.data.data
		this.totalRows=data.data.size
		// Must return an array of items or an empty array if an error occurred
		return(items || [])
	  })
	},
    info (item, index, button) {
		axios.get('/api/ins/doctor?_id='+item._id).then((data) => {
		// Pluck the array of items off our axios response
		let items = data.data.data		

		this.modalInfo=items[0]
		this.$root.$emit('bv::show::modal', 'modalInfo', button)
	  })
      
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<!-- table-complete-1.vue -->