import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/views/Layout/DashboardLayout";
import AuthLayout from "@/views/Pages/AuthLayout";

// Dashboard pages
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Alternative from "../views/Dashboard/AlternativeDashboard.vue";
import Widgets from "../views/Widgets.vue";
import Charts from "../views/Charts.vue";
import Calendar from "../views/Calendar/Calendar.vue";

// Pages
import Pricing from "../views/Pages/Pricing.vue";
import Login from "../views/Pages/Login.vue";
import Register from "../views/Pages/Register.vue";
import Lock from "../views/Pages/Lock.vue";
import Profile from "../views/Pages/UserProfile.vue";
import Timeline from "../views/Pages/TimeLinePage.vue";

// Components pages
import Buttons from "../views/Components/Buttons.vue";
import Cards from "../views/Components/Cards.vue";
import Grid from "../views/Components/GridSystem.vue";
import Notifications from "../views/Components/Notifications.vue";
import Icons from "../views/Components/Icons.vue";
import Typography from "../views/Components/Typography.vue";

// Tables pages
import RegularTables from "../views/Tables/RegularTables.vue";
import SortableTables from "../views/Tables/SortableTables.vue";
import PaginatedTables from "../views/Tables/PaginatedTables.vue";

// Maps pages
import GoogleMaps from "../views/Maps/GoogleMaps.vue";
import VectorMaps from "../views/Maps/VectorMaps.vue";

// Forms pages
import FormElements from "../views/Forms/FormElements.vue";
import FormComponents from "../views/Forms/FormComponents.vue";
import FormValidation from "../views/Forms/FormValidation.vue";

import Users from "../views/Pages/Users";
import Payments from "../views/Pages/Payments.vue";
import Orders from "../views/Pages/Orders.vue";
import Outlets from "../views/Pages/Outlets.vue";
import Brands from "../views/Pages/Brands";
import Departments from "../views/Pages/Departments";
import Items from "../views/Pages/Items"



let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons },
    },
    {
      path: "cards",
      name: "Cards",
      components: { default: Cards },
    },
    {
      path: "grid-system",
      name: "Grid",
      components: { default: Grid },
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications },
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons },
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography },
    },
  ],
};

let tablesMenu = {
  path: "/tables",
  component: DashboardLayout,
  redirect: "/tables/regular",
  name: "Tables menu",
  children: [
    {
      path: "regular",
      name: "Tables",
      components: { default: RegularTables },
    },
    {
      path: "sortable",
      name: "Sortable",
      components: { default: SortableTables },
    },
    {
      path: "paginated",
      name: "Paginated",
      components: { default: PaginatedTables },
    },
  ],
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  redirect: "/maps/google",
  name: "Maps",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: { default: GoogleMaps },
    },
    {
      path: "vector",
      name: "Vector Map",
      components: { default: VectorMaps },
    },
  ],
};

let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/elements",
  name: "Forms",
  children: [
    {
      path: "elements",
      name: "Forms elements",
      components: { default: FormElements },
    },
    {
      path: "components",
      name: "Forms Components",
      components: { default: FormComponents },
    },
    {
      path: "validation",
      name: "Forms Validation",
      components: { default: FormValidation },
    },
  ],
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/brands",
        name: "brands",
        components: { default: Brands },
      },
      {
        path: "/outlets",
        name: "outlets",
        components: { default: Outlets },
      },
      {
        path: "/departments",
        name: "departments",
        components: { default: Departments },
      },
      {
        path: "/items",
        name: "menu items",
        components: { default: Items },
      },
      // {
      //   path: "/maps",
      //   name: "maps",
      //   components: { default: Maps },
      // },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/payments",
        name: "payments",
        components: { default: Payments },
      },
      {
        path: "/orders",
        name: "orders",
        components: { default: Orders },
      },
      {
        path: "/users",
        name: "users",
        components: { default: Users },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
  componentsMenu,
  // {
  //   path: "/",
  //   redirect: "auth",
  //   component: Auth,
  //   children: [
  //     {
  //       path: "/auth",
  //       name: "auth",
  //       components: { default: Login },
  //     }
  //   ]
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
