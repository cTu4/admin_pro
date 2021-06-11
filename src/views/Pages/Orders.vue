<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5">

    </base-header>
    <!-- Card stats -->
    <div class="payments mt--7">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import moment from 'moment';


export default {
  name: "Payments",
  components: {

  },
  data(){
    return {
      cards:{},
      cardsData:[
        {
          Title: "Total",
          icon: "ni ni-cart",
          color: "gradient-blue",
          footerClass: "",
          mainHead: true,         // true = show total     false = show Sum
          showFooter: false       // show / don't show sum in footer
        },
        {
          Title: "Payeds",
          icon: "ni ni-cart",
          color: "gradient-green",
          footerClass: "text-success",
          mainHead: true,
          showFooter: false       // show / don't show sum in footer
        },
        {
          Title: "Not payed",
          icon: "ni ni-cart",
          color: "gradient-red",
          footerClass: "text-danger",
          mainHead: true,
          showFooter: false       // show / don't show sum in footer
        }
      ],
      table:{
        isLoading: false,
        isReSearch: false,
        columns: [
          {
            label: "Brand name",
            field: "brandName",
            width: "20%",
            sortable: true,
            isKey: true,
          },
          {
            label: "Outlet name",
            field: "outletName",
            width: "20%",
            sortable: true,
            isKey: true,
          },
          {
            label: "Amount",
            field: "orderAmount",
            width: "20%",
            sortable: true,
            display(row){
              return parseFloat(row.orderAmount).toFixed(2) + " " + row.orderCurrency;
            }
          },
          {
            label: "Date",
            field: "orderDate",
            width: "20%",
            sortable: true,
            display(row){
              return row.orderDate? moment(row.orderDate*1000).format('DD.MM.YYYY, hh:mm:ss') : "-";
            }
          },
          {
            label: "Status",
            field: "isPayed",
            width: "10%",
            sortable: true,
            display(row){
              return row.isPayed === "Y"? "<i class=\"fas fa-check\"></i>" : "<i class=\"fas fa-times\"></i>"
            }
          }
        ],
        rows: [

        ],
        totalRecordCount: 2,
        sortable: {
          order: "id",
          sort: "asc",
        },
        messages: {
          pagingInfo: "Showing {0}-{1} of {2}",
          pageSizeChangeLabel: "Row count:",
          gotoPageLabel: "Go to page:",
          noDataAvailable: "No data",
        },
      }

    }
  },
  methods:{
    doSearch(offset, limit, order, sort){
      this.table.isLoading = true;
      // this.table.isReSearch = offset == undefined ? true : false;

      if(sort === "asc"){
        this.table.rows.sort((a,b) => (a.[order] < b.[order]) ? 1 : ((b.[order] < a.[order]) ? -1 : 0))
      }
      else{
        this.table.rows.sort((a,b) => (a.[order] > b.[order]) ? 1 : ((b.[order] > a.[order]) ? -1 : 0))
      }
      // do your search event to get newRows and new Total
      this.table.sortable.order = order;
      this.table.sortable.sort = sort;
      this.table.isLoading = false;

    },
    tableLoadingFinish(elements){
      this.table.isLoading = false;
      Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("name-btn")) {
          element.addEventListener("click", function () {
            // do your click event
            console.log(this.dataset.id + " name-btn click!!");
          });
        }
        if (element.classList.contains("quick-btn")) {
          // do your click event
          element.addEventListener("click", function () {
            console.log(this.dataset.id + " quick-btn click!!");
          });
        }
      });
    },
    updateCheckedRows(rowsKey){
      console.log(rowsKey);

    }
  },
  mounted(){

  },
  created(){
    if(!this.$store.state.auth){
      this.$router.push(
          {
            name: 'login'
          });
    }
   // let auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3NvLmJyZXN0LmFwcFwvIiwic3ViIjoiQkI3OTYwODYtQkUwMS0xMUVCLTgxQ0ItNkVGOTFGRTZBODA1IiwiaWF0IjoxNjIyNjU1NzYwLCJleHAiOjE2MjI2NzAxNjB9.ZZ3m7OdA4h_2M3GWWy8qyO1pBhGye0zlGsTUXUiscNo";
    axios.get('https://api.brest.app/order/',{
      headers:{
        // Authorization: auth
        Authorization: this.$store.state.auth
      }
    }).then((resp)=>{
      let data = resp.data;
      if(data.STATUS === "SUCCESS"){
        let rows = [];
        // let total = 0,
        //     total_sum=0,
        //     total_payed=0,
        //     total_payed_sum=0;
        for (let item in data.RESULT){
          // let row = data.RESULT[item];
          // let price = parseFloat(row.orderAmount);
          // total_sum += price;
          // total++;
          // if(row.isPayed === "Y"){
            // total_payed_sum += price;
            // total_payed++;
          // }
          rows.push(data.RESULT[item]);
        }
        // let total_not_payed = total - total_payed,
        //     total_not_payed_sum = total_sum - total_payed_sum,
        //     currency = "USD";
        // this.cards['total'] = {
        //   title: "Total orders",
        //   subTitle: total,
        //   icon: 'ni ni-single-copy-04',
        //   color: 'gradient-blue',
        //   footerTitle: total_sum + " " + currency,
        //   currency: "USD",
        //   footerClass: "",
        //   mainHead: true  // { head / footer }
        // };
        // this.cards['total_payed'] = {
        //   title: "Payed orders",
        //   subTitle: total_payed,
        //   icon: 'ni ni-money-coins',
        //   color: 'gradient-green',
        //   footerTitle: total_payed_sum + " " + currency,
        //   currency: "USD",
        //   footerClass: "text-success",
        //   mainHead: true
        // };
        // this.cards['total_not_payed'] = {
        //   title: "Not payed orders",
        //   subTitle: total_not_payed,
        //   icon: 'ni ni-money-coins',
        //   color: 'gradient-red',
        //   footerTitle: total_not_payed_sum + " " + currency,
        //   currency: "USD",
        //   footerClass: "text-danger",
        //   mainHead: true
        // };

        this.table.rows = rows;
      }
    });

  }
};
//this.table.rows.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
</script>
<style >
.payments{
  padding-left: 39px !important;
  padding-right: 39px !important;
}
.payments .card{
  padding: 0!important;
}
.payments .card-body{
  padding: 0 1.5rem!important;
}
.payments table{
  margin-bottom: 10px!important;
}
.payments .dataTables_wrapper{
  padding-bottom: 10px;
}
.non-m > div{
  margin-bottom: -1rem!important;
}
</style>
