<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
<!--      <div class="container">-->
<!--        <div class="header-body text-center mb-7">-->
<!--          <div class="row justify-content-center">-->
<!--            <div class="col-xl-5 col-lg-6 col-md-8 px-5">-->
<!--              <h1 class="text-white">Welcome!</h1>-->
<!--              <p class="text-lead text-white">-->
<!--                Use these awesome forms to login or create new account in your-->
<!--                project for free.-->
<!--              </p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
<!--            <div class="card-header bg-transparent pb-5">-->
<!--              <div class="text-muted text-center mt-2 mb-3">-->
<!--                <small>Sign in with</small>-->
<!--              </div>-->
<!--              <div class="btn-wrapper text-center">-->
<!--                <a href="#" class="btn btn-neutral btn-icon">-->
<!--                  <span class="btn-inner&#45;&#45;icon"-->
<!--                    ><img src="img/icons/common/github.svg"-->
<!--                  /></span>-->
<!--                  <span class="btn-inner&#45;&#45;text">Github</span>-->
<!--                </a>-->
<!--                <a href="#" class="btn btn-neutral btn-icon">-->
<!--                  <span class="btn-inner&#45;&#45;icon"-->
<!--                    ><img src="img/icons/common/google.svg"-->
<!--                  /></span>-->
<!--                  <span class="btn-inner&#45;&#45;text">Google</span>-->
<!--                </a>-->
<!--              </div>-->
<!--            </div>-->
            <div class="card-body px-lg-5 py-lg-5">
<!--              <div class="text-center text-muted mb-4">-->
<!--                <small>Or sign in with credentials</small>-->
<!--              </div>-->
<!--              :validation-schema="schema"-->
              <Form @submit="onSubmit" >
                <base-input
                  alternative
                  name="email"
                  v-model:value="model.email"
                  addon-left-icon="ni ni-email-83"
                  placeholder="Email"
                >
                </base-input>

                <base-input
                  alternative
                  name="password"
                  v-model:value="model.password"
                  addon-left-icon="ni ni-lock-circle-open"
                  type="password"
                  placeholder="Password"
                >
                </base-input>

                <base-checkbox v-model="model.rememberMe"
                  >Remember me</base-checkbox
                >
                <div class="text-center">
                  <base-button type="primary" native-type="submit" class="my-4"
                    >Sign in</base-button
                  >
                </div>
              </Form>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
              >
            </div>
<!--            <div class="col-6 text-right">-->
<!--              <router-link to="/register" class="text-light"-->
<!--                ><small>Create new account</small></router-link-->
<!--              >-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "vue-toastification";
import Notification from "@/components/Notification";


export default {
  components: {
    Form,
  },
  data() {
    return {
      model: {
        email: "",
        password: "",
        rememberMe: false,
      },
    };
  },
  methods:{
        onSubmit(values) {
            if(this.model.email && this.model.password){
              console.log(this.model);
              axios.post('https://api.brest.app/token/',{
                    "email": this.model.email,
                    "password": this.model.password
                  },
                  {
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  }).then((resp)=>{
                console.log(resp);
                if(resp.data.STATUS === "SUCCESS"){
                  this.$store.commit('logIn', "Bearer " + resp.data.TOKEN);
                  // this.$store.state.auth = "Bearer " + resp.data.TOKEN;
                  this.$router.push({path: '/dashboard'});
                }
                else {
                  this.runToast('top-right', 'danger',"Wrong auth!")
                }

              });
          }

      },
    runToast(pos, type, ownText, ownIcon) {
      const text =
          "Welcome to <b>Vue Argon Dashboard Pro</b> - a beautiful resource for every web developer";
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
        closeButton: false,
        position: pos,
      });
    },
  },
  setup() {
    // function onSubmit(values) {
    //   if(values.email && values.password){
    //     console.log(values);
    //     axios.post('https://api.brest.app/token/',{
    //           "email": values.email,
    //           "password": values.password
    //         },
    //         {
    //           headers:{
    //             'Content-Type': 'application/json'
    //           }
    //         }).then((resp)=>{
    //       console.log(resp);
    //       if(resp.data.STATUS === "SUCCESS"){
    //         this.$store.commit('logIn', "Bearer " + resp.data.TOKEN);
    //         // this.$store.state.auth = "Bearer " + resp.data.TOKEN;
    //         this.$router.push({path: '/dashboard'});
    //       }
    //       else {
    //         alert('Wrong auth!')
    //       }
    //
    //     });
    //   }
    //
    // }

    const schema = Yup.object().shape({
      fullName: Yup.string().required().label("The Full Name"),
      email: Yup.string().email().required().label("The Email"),
      password: Yup.string().min(5).required().label("The Password"),
    });

    return {
      // onSubmit,
      schema,
    };
  },
};
</script>
