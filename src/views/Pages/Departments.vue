<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5">

      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Paginated tables</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
      <div  class="row">
        <div class="col-xl-4 col-lg-4">
          <stats-card
              title="Total"
              color="gradient-blue"
              :sub-title="total"
              icon="ni ni-shop"
              class="mb-4 mb-xl-0 non-m"
          >
<!--            <template v-slot:footer>-->
<!--              <span class="text-success mr-2">-->
<!--                <i class="fa fa-arrow-up"></i> 3.48%-->
<!--              </span>-->
<!--              <span class="text-nowrap">Since last month</span>-->
<!--            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-4 col-lg-4">
          <stats-card
              title="Active"
              type="gradient-green"
              :sub-title="active"
              icon="ni ni-shop"
              class="mb-4 mb-xl-0 non-m"
          >
<!--            <template v-slot:footer>-->
<!--              <span class="text-danger mr-2">-->
<!--                <i class="fa fa-arrow-down"></i> 5.72%-->
<!--              </span>-->
<!--              <span class="text-nowrap">Since last month</span>-->
<!--            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-4 col-lg-4">
          <stats-card
              title="Blocked"
              type="gradient-red"
              :sub-title="blocked"
              icon="ni ni-shop"
              class="mb-4 mb-xl-0 non-m"
          >
<!--            <template v-slot:footer>-->
<!--              <span class="text-danger mr-2">-->
<!--                <i class="fa fa-arrow-down"></i> 5.72%-->
<!--              </span>-->
<!--              <span class="text-nowrap">Since last month</span>-->
<!--            </template>-->
          </stats-card>
        </div>
      </div>
    </base-header>
      <!-- Card stats -->
    <div class="outlets mt--7 ">
      <div>
        <card
            class="no-border-card"
            body-classes="px-0 pb-1"
            footer-classes="pb-2"
        >
          <template v-slot:header>
            <h3 class="mb-0">Paginated tables</h3>
            <p class="text-sm mb-0">
              This is a client side example of paginated tables using element-ui
              tables.
            </p>
          </template>
          <div>
            <div
                class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <el-select
                  class="select-primary pagination-select"
                  v-model="pagination.perPage"
                  placeholder="Per page"
              >
                <el-option
                    class="select-primary"
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                >
                </el-option>
              </el-select>

              <div>
                <el-input
                    type="search"
                    class="mb-3"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 200px"
                    placeholder="Search records"
                    v-model="searchQuery"
                    aria-controls="datatables"
                >
                </el-input>
              </div>
            </div>
            <el-table
                :data="queriedData"
                row-key="id"
                header-row-class-name="thead-light"
                @selection-change="selectionChange"
            >
              <el-table-column
                  v-for="column in tableColumns"
                  :key="column.label"
                  v-bind="column"
              >
              </el-table-column>
              <el-table-column min-width="180px" align="right" label="Actions">
                <template v-slot:default="props">
                  <div class="d-flex">
                    <base-button
                        @click="handleLike(props.$index, props.row)"
                        class="like btn-link"
                        type="info"
                        size="sm"
                        icon
                    >
                      <i class="text-white ni ni-like-2"></i>
                    </base-button>
                    <base-button
                        @click="handleEdit(props.$index, props.row)"
                        class="edit"
                        type="warning"
                        size="sm"
                        icon
                    >
                      <i class="text-white ni ni-ruler-pencil"></i>
                    </base-button>
                    <base-button
                        @click="handleDelete(props.$index, props.row)"
                        class="remove btn-link"
                        type="danger"
                        size="sm"
                        icon
                    >
                      <i class="text-white ni ni-fat-remove"></i>
                    </base-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <template v-slot:footer>
            <div
                class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="">
                <p class="card-category">
                  Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
                </p>
              </div>
              <base-pagination
                  class="pagination-no-border"
                  v-model="pagination.currentPage"
                  :per-page="pagination.perPage"
                  :total="total"
              >
              </base-pagination>
            </div>
          </template>
        </card>
      </div>



    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { useToast } from "vue-toastification";
import Notification from "@/components/Notification";
// import projects from "./projects";
// import users from "./users";
import LightTable from "@/views/Tables/RegularTables/LightTable.vue";
import {
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElInput,
} from "element-plus";
import BasePagination from "@/components/BasePagination";
import swal from "sweetalert2";
export default {
  name: "Departments",
  components: {
    BasePagination,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    [ElTable.name]: ElTable,
    [ElInput.name]: ElInput,
    [ElTableColumn.name]: ElTableColumn,
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      if (!this.searchQuery) {
        return this.pagedData;
      }
      let result = this.tableData.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });

      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
          ? this.searchedData.length
          : this.tableData.length;
    },
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["name", "email"],
      tableColumns: [
        {
          prop: "brandName",
          label: "Brand",
          minWidth: 150,
        },
        {
          prop: "departmentName",
          label: "Department",
          minWidth: 150,
        },
        {
          prop: "outletName",
          label: "Outlet",
          minWidth: 150,
        },
        {
          prop: "isActive",
          label: "Active",
          minWidth: 50,
        },
      ],
      // tableColumns: [
      //   {
      //     type: "selection",
      //   },
      //   {
      //     prop: "name",
      //     label: "Name",
      //     minWidth: 160,
      //     sortable: true,
      //   },
      //   {
      //     prop: "position",
      //     label: "Position",
      //     minWidth: 220,
      //     sortable: true,
      //   },
      //   {
      //     prop: "city",
      //     label: "Office",
      //     minWidth: 135,
      //     sortable: true,
      //   },
      //   {
      //     prop: "age",
      //     label: "Age",
      //     minWidth: 100,
      //     sortable: true,
      //   },
      //   {
      //     prop: "createdAt",
      //     label: "Start Date",
      //     minWidth: 150,
      //     sortable: true,
      //   },
      //   {
      //     prop: "salary",
      //     label: "Salary",
      //     minWidth: 120,
      //     sortable: true,
      //   },
      // ],
      tableData: [

      ],
      fuseSearch: null,
      searchedData: [],
    };
  },
  methods: {
    handleLike(index, row) {
      const swalWithBootstrapButtons1 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons1.fire({
        title: `You liked ${row.name}`,
      });
    },
    handleEdit(index, row) {
      const swalWithBootstrapButtons2 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-info btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons2.fire({
        title: `You want to edit ${row.name}`,
      });
    },
    handleDelete(index, row) {
      const swalWithBootstrapButtons3 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
          cancelButton: "btn btn-danger btn-fill",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons3
          .fire({
            title: "Are you sure?",
            text: `You won't be able to revert this!`,
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
          })
          .then((result) => {
            if (result.value) {
              this.deleteRow(row);
              swalWithBootstrapButtons3.fire({
                title: "Deleted!",
                text: `You deleted ${row.name}`,
              });
            }
          });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
          (tableRow) => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
  },
  created(){
    if(!this.$store.state.auth){
      this.$router.push(
          {
            name: 'login'
          });
    }
    axios.get('https://api.brest.app/department/',{
      headers:{
        // Authorization: auth
        Authorization: this.$store.state.auth
      }
    }).then((resp)=>{
      let data = resp.data;

      if(data.STATUS === "SUCCESS"){
        let rows = [];
        let total = 0,
            active = 0,
            blocked = 0;
        for (let item in data.RESULT){
          let row = data.RESULT[item];
          row.isActive === "Y"? active += 1 : blocked += 1;
          // let price = parseFloat(row.paymentAmount);
          total += 1;
          rows.push(row);

        }
        this.tableData = rows;

      }
    }).catch(error => {
      this.runToast('top-right', 'warning', "Auth wrong!");
      this.$router.push({path: '/login'});
    });

  }



  // data(){
  //   return {
  //     mode: {mode: 'autoSizeOnTextOverlap'},
  //     columns: [
  //         {
  //           prop: "brandName",
  //           name: "Brand",
  //           sortable: true,
  //           order: 'asc',
  //           size: 250
  //           // size: 250
  //         },
  //         {
  //           prop: "outletName",
  //           name: "Outlet",
  //           sortable: true,
  //           order: 'asc',
  //           size: 250
  //           // size: 250
  //         },
  //       {
  //         prop: "departmentName",
  //         name: "Department",
  //         sortable: true,
  //         order: 'asc',
  //         size: 250
  //         // size: 250
  //       },
  //       {
  //         prop: "isActive",
  //         name: "Active",
  //         sortable: true,
  //         size: 100
  //
  //
  //       },
  //     ],
  //     rows: [
  //
  //
  //     ],
  //     total: 0,
  //     active: 0,
  //     blocked: 0,
  //     currency: "$",
  //     table:{
  //       isLoading: false,
  //       isReSearch: false,
  //       columns: [
  //         {
  //           label: "Brand",
  //           field: "brandName",
  //           width: "33%",
  //           sortable: true,
  //           isKey: true,
  //         },
  //         {
  //           label: "Outlet",
  //           field: "outletName",
  //           width: "33%",
  //           sortable: true,
  //           // display(row){
  //           //   return parseFloat(row.lastName).toFixed(2) + " " + row.currency;
  //           // }
  //         },
  //         {
  //           label: "Department",
  //           field: "departmentName",
  //           width: "33%",
  //           sortable: true,
  //           // display(row){
  //           //   return parseFloat(row.lastName).toFixed(2) + " " + row.currency;
  //           // }
  //         },
  //         {
  //           label: "Active",
  //           field: "isActive",
  //           width: "1%",
  //           sortable: true,
  //           display(row){
  //             return row.isActive === "Y"? "<i class=\"fas fa-check\"></i>" : "<i class=\"fas fa-times\"></i>"
  //           }
  //           // display(row){
  //           //   return parseFloat(row.lastName).toFixed(2) + " " + row.currency;
  //           // }
  //         },
  //         {
  //           label: "Edit",
  //           field: "",
  //           width: "5%",
  //           sortable: false,
  //           display(row){
  //             let disp = "";
  //             disp = `<i class='fas fa-edit'></i>`;
  //
  //
  //             return disp;
  //           }
  //         },
  //         // {
  //         //   label: "Business date",
  //         //   field: "businessDate",
  //         //   width: "5%",
  //         //   sortable: true,
  //         //   display(row){
  //         //     return row.businessDate?moment(row.businessDate*1000).format('DD.MM.YYYY, hh:mm:ss'): "-";
  //         //   }
  //         // },
  //         // {
  //         //   label: "Type",
  //         //   field: "paymentType",
  //         //   width: "5%",
  //         //   sortable: true
  //         // }
  //       ],
  //       rows: [
  //
  //       ],
  //       totalRecordCount: 2,
  //       sortable: {
  //         order: "id",
  //         sort: "asc",
  //       },
  //       messages: {
  //         pagingInfo: "Showing {0}-{1} of {2}",
  //         pageSizeChangeLabel: "Row count:",
  //         gotoPageLabel: "Go to page:",
  //         noDataAvailable: "No data",
  //       },
  //     }
  //
  //   }
  // },
  // methods:{
  //   runToast(pos, type, ownText, ownIcon) {
  //     const text =
  //         "Welcome to <b>Vue Argon Dashboard Pro</b> - a beautiful resource for every web developer";
  //     const icon = "ni ni-bell-55";
  //     const content = {
  //       component: Notification,
  //       props: {
  //         ownText: ownText,
  //         ownIcon: ownIcon,
  //         icon: icon,
  //         text: text,
  //         type: type,
  //       },
  //     };
  //     const toast = useToast();
  //     toast(content, {
  //       hideProgressBar: true,
  //       icon: false,
  //       closeButton: false,
  //       position: pos,
  //     });
  //   },
  //   doSearch(offset, limit, order, sort){
  //     this.table.isLoading = true;
  //     // this.table.isReSearch = offset == undefined ? true : false;
  //
  //     if(sort === "asc"){
  //       this.table.rows.sort((a,b) => (a.[order] < b.[order]) ? 1 : ((b.[order] < a.[order]) ? -1 : 0))
  //     }
  //     else{
  //       this.table.rows.sort((a,b) => (a.[order] > b.[order]) ? 1 : ((b.[order] > a.[order]) ? -1 : 0))
  //     }
  //     // do your search event to get newRows and new Total
  //     this.table.sortable.order = order;
  //     this.table.sortable.sort = sort;
  //     this.table.isLoading = false;
  //
  //   },
  //   OpenModal(){
  //     console.log('1111111');
  //   },
  //   tableLoadingFinish(elements){
  //
  //     this.table.isLoading = false;
  //     Array.prototype.forEach.call(elements, function (element) {
  //       if (element.classList.contains("name-btn")) {
  //         element.addEventListener("click", function () {
  //           // do your click event
  //           console.log(this.dataset.id + " name-btn click!!");
  //         });
  //       }
  //       if (element.classList.contains("quick-btn")) {
  //         // do your click event
  //         element.addEventListener("click", function () {
  //           console.log(this.dataset.id + " quick-btn click!!");
  //         });
  //       }
  //     });
  //   },
  //   updateCheckedRows(rowsKey){
  //     console.log(rowsKey);
  //
  //   }
  // },
  // mounted(){
  //
  // },

};
//this.table.rows.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
</script>
<style >

</style>
