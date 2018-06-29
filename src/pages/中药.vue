<template>
  <b-container fluid>
    <!-- User Interface controls -->
	<b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
     

      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Per page" class="mb-0">
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
      <template slot="name" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
      <template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
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

   
  </b-container>
</template>

<script>
var axios = require("axios");


export default {
  data () {
    return {
      //items: items,
	  fields: [ 
	  '名称','规格','单价'
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
	  let promise = axios.get('/api/ins/中药?start='+(ctx.currentPage-1)*ctx.perPage+'&count='+ctx.perPage+(ctx.filter?'&reg_名称='+ctx.filter:''))

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
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
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