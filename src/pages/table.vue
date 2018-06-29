<template>
  <b-container fluid>
    <!-- User Interface controls -->


    <!-- Main table element -->
    <b-table show-empty
             stacked="md"             
			 :busy.sync="isBusy"
			 :items="myProvider"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
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
	  {
          key: 'community',
          label: '社区'
      },
	  {
          key: 'location',
          label: '地址'
      },
	  {
          key: 'floor',
          label: '楼层'
      } ],
	  currentPage: 1,
      perPage: 10,
      pageOptions: [ 5, 10, 15 ],
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
	  let promise = axios.get('/api/ins/House')

	  // Must return a promise that resolves to an array of items
	  return promise.then((data) => {
		// Pluck the array of items off our axios response
		let items = data.data
		this.totalRows=items.length
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