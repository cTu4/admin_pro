<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8">

      <div class="row align-items-center py-4">
        <div class="col-lg-11 col-11">
          <h6 class="h2 text-white d-inline-block mb-0">Departments</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>



      </div>
<!--      <div  class="row">-->
<!--        <div class="col-xl-4 col-lg-4">-->
<!--          <stats-card-->
<!--              title="Total"-->
<!--              color="gradient-blue"-->
<!--              :sub-title="totalCard"-->
<!--              icon="ni ni-shop"-->
<!--              class="mb-4 mb-xl-0 non-m"-->
<!--          >-->
<!--&lt;!&ndash;            <template v-slot:footer>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="text-success mr-2">&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="fa fa-arrow-up"></i> 3.48%&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="text-nowrap">Since last month</span>&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--          </stats-card>-->
<!--        </div>-->
<!--        <div class="col-xl-4 col-lg-4">-->
<!--          <stats-card-->
<!--              title="Active"-->
<!--              type="gradient-green"-->
<!--              :sub-title="activeCard"-->
<!--              icon="ni ni-shop"-->
<!--              class="mb-4 mb-xl-0 non-m"-->
<!--          >-->
<!--&lt;!&ndash;            <template v-slot:footer>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="text-danger mr-2">&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="fa fa-arrow-down"></i> 5.72%&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="text-nowrap">Since last month</span>&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--          </stats-card>-->
<!--        </div>-->
<!--        <div class="col-xl-4 col-lg-4">-->
<!--          <stats-card-->
<!--              title="Blocked"-->
<!--              type="gradient-red"-->
<!--              :sub-title="blockedCard"-->
<!--              icon="ni ni-shop"-->
<!--              class="mb-4 mb-xl-0 non-m"-->
<!--          >-->
<!--&lt;!&ndash;            <template v-slot:footer>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="text-danger mr-2">&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="fa fa-arrow-down"></i> 5.72%&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="text-nowrap">Since last month</span>&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--          </stats-card>-->
<!--        </div>-->
<!--      </div>-->
    </base-header>
      <!-- Card stats -->
    <div class="outlets mt--8">
      <div>
        <card
            class="no-border-card"
            body-classes="px-0 pb-1"
            footer-classes="pb-2"
        >
          <div>
            <div
                class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap pt-4"
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
              <div >
                <base-button size="sm" type="neutral">New</base-button>
                <base-button size="sm" type="neutral">Filters</base-button>
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
    <modal v-model:show="modal"  size="sm" body-classes="p-0">
      <card
          type="secondary"
          header-classes="bg-transparent pb-3"
          body-classes="px-lg-5 py-lg-5"
          class="border-0 mb-0"
      >
        <template v-slot:header>
          <div class="text-muted text-center mt-2 mb-1">
            <small>Edit {{formModal.departmentName?formModal.departmentName:"department"}}</small>
          </div>
        </template>
        <form  @submit="Submit" class="mt-2">
          <base-input
              name="brandName"
              required
              alternative
              v-model:value="formModal.brandName"
              class="mb-3"
              label="Brand"
              addon-left-icon="ni ni-planet"
          >
          </base-input>
          <base-input
              name="outletName"
              required
              alternative
              v-model:value="formModal.outletName"
              label="Outlet"
              addon-left-icon="ni ni-shop"
          >
          </base-input>

          <base-input
              name="departmentName"
              required
              alternative
              v-model:value="formModal.departmentName"

              label="departmentName"
              addon-left-icon="ni ni-building"
          >
          </base-input>

          <base-checkbox
              name="isActive"
              required
              v-model="active"
              type="info"
              label="Active"
          >
          </base-checkbox>


          <div class="text-center">
            <base-button  @click="Submit" type="primary"  class="my-4">
              Submit
            </base-button>
            <base-button  @click="modal = false" type="danger"  class="my-4">
              Cancel
            </base-button>
          </div>
        </form>
      </card>
    </modal>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Modal from "@/components/Modal";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import BaseCheckbox from "@/components/Inputs/BaseCheckbox.vue";
import BaseSwitch from "@/components/BaseSwitch.vue";

import { useToast } from "vue-toastification";
import Notification from "@/components/Notification";



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
    Modal,
    BaseInput,
    BaseCheckbox,
    BaseSwitch,
    Notification
  },
  data() {
    return {
      totalCard: 0,
      activeCard: 0,
      blockedCard: 0,
      modal: false,
      formModal: {
        brandName: '',
        outletName: "",
        departmentName: "",
        isActive: true
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["brandName", "departmentName", "outletName"],
      tableColumns: [
        {
          prop: "brandName",
          label: "Brand",
          minWidth: 150,
        },
        {
          prop: "outletName",
          label: "Outlet",
          minWidth: 150,
        },
        {
          prop: "departmentName",
          label: "Department",
          minWidth: 150,
        },
        {
          prop: "isActive",
          label: "Active",
          minWidth: 70,
        },
      ],
      tableData: [

      ],
      fuseSearch: null,
      searchedData: [],
    };
  },
  computed: {
    type(){
      return this.$route.meta.navbarType
    },
    active:{
      get(){
        return this.formModal.isActive === "Y";
      },
      set(value){
        this.formModal.isActive = value?"Y":"N";
      }
    },
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
  methods: {
    Submit(values){
      console.log(this.formModal);
      axios.put("https://api.brest.app/department/", this.formModal, {
        headers:{
          // Authorization: auth
          Authorization: this.$store.state.auth
        }
      }).then((resp) =>{
        this.showSwal('success');
        // this.runToast('top-right', 'success')
        this.modal = false;
      }).catch((error)=>{
        this.showSwal('warning');
      });

    },
    toggleSidebar() {
      console.log(this.$sidebar.showSidebar);
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },

    handleEdit(index, row) {
      this.formModal = row;
      console.log(this.formModal);
      this.modal = true;
      // const swalWithBootstrapButtons2 = swal.mixin({
      //   customClass: {
      //     confirmButton: "btn btn-info btn-fill",
      //   },
      //   buttonsStyling: false,
      // });
      //
      // swalWithBootstrapButtons2.fire({
      //   title: `You want to edit ${row.departmentName}`,
      // });
    },
    handleDelete(index, row) {
      const swalWithBootstrapButtons3 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
          cancelButton: "btn btn-danger btn-fill",
        },
        buttonsStyling: false,
      });
      console.log(document.body);
      let title = row.isActive ==="Y"?"Deactivate":"Activate"
      swalWithBootstrapButtons3
          .fire({
            title: title + " this department?",
            text: row.isActive ==="Y"?`You can't be able to use it before re-activate`:"",
            showCancelButton: true,
            confirmButtonText: "Yes, "+title.toLowerCase()+".",
          })
          .then((result) => {
            if (result.value) {
              console.log(row);
              axios.delete("https://api.brest.app/department/",{
                headers:{
                  // Authorization: auth
                  Authorization: this.$store.state.auth
                },
                data:{
                  uuid: row.uuid
                }
              }).then((resp) =>{
                // this.deleteRow(row);
                row.isActive = row.isActive === "Y"? "N":"Y";
                swalWithBootstrapButtons3.fire({
                  title: `Now ${row.isActive ==="Y"?"active":"inactive"}!`,
                  text: `You mark ${row.departmentName} ${row.isActive ==="Y"?"active":"inactive"}`,
                });
              }).catch((error) =>{
                swalWithBootstrapButtons3.fire({
                  title: "Oops!",
                  text: `Something's wrong`,
                  showCancelButton: true,
                  showConfirmButton: false,
                  cancelButtonText: "Ok"
                });
                console.error(error);
              });
            }
          });
    },
    showSwal(type) {
      if (type === "basic") {
        swal.fire({
          title: `Here's a message!`,
          text: `A few words about this sweet alert ...`,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } else if (type === "info") {
        swal.fire({
          icon: "info",
          title: `Info`,
          text: `A few words about this sweet alert ...`,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-info",
          },
        });
      } else if (type === "success") {
        swal.fire({
          title: `Success`,
          text: "A few words about this sweet alert ...",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          },
          icon: "success",
        });
      } else if (type === "warning") {
        swal.fire({
          title: `Warning`,
          text: "Somethings wrong! Try later...",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-warning",
          },
          icon: "warning",
        });
      } else if (type === "question") {
        swal.fire({
          title: `Are you sure?`,
          text: "A few words about this sweet alert ...",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-default",
          },
          icon: "question",
        });
      }
    },
    runToast(pos, type, ownText, ownIcon) {
      const text =
          "Welcome to <b>BrestApp Dashboard</b>";
      const icon = "ni ni-bell-55";
      const content = {
        component: Notification,
        props: {
          ownText: ownText,
          ownIcon: ownIcon,
          icon: icon,
          text: text,
          type: type,
        },
      };
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        closeButton: true,
        position: pos,
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
        this.totalCard =  total.toString();
        this.activeCard = active.toString();
        this.blockedCard = blocked.toString();

      }
    }).catch(() => {
      this.runToast('top-right', 'warning', "Auth wrong!");
      this.$router.push({path: '/login'});
    });

  }




};
//this.table.rows.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
</script>
<style >

</style>
