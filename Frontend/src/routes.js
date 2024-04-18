
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
//import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Login1 from "views/examples/Login1.js";
import Login2 from "views/examples/Login2.js";
import Tables from "views/examples/Tables.js";
import AdminDas from "views/examples/AdminDas";
import CameraReadyPage from "views/examples/CameraReadyPage";
import PPTSubmissionPage from "views/examples/PPTSubmissionPage";
import ReviewerCam from "views/examples/ReviewerCam";
//import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Log Out",
    icon: "ni ni-key-25 text-info",
    component: <Index />,
    layout: "/auth",
  },
  {
    path: "/admin-das",
    name: "Admin's Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <AdminDas />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User's Dashboard",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/reviewer",
    name: "Reviewer's Dashboard",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/login1",
    name: "Login1",
    icon: "ni ni-key-25 text-info",
    component: <Login1 />,
    layout: "/auth",
  },
  {
    path: "/login2",
    name: "Login2",
    icon: "ni ni-key-25 text-info",
    component: <Login2 />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/camera",
    name: "CameraReadyPage",
    icon: "ni ni-circle-08 text-pink",
    component: <CameraReadyPage />,
    layout: "/auth",
  },
  {
    path: "/ppt",
    name: "PPTSubmissionPage",
    icon: "ni ni-circle-08 text-pink",
    component: <PPTSubmissionPage />,
    layout: "/auth",
  },
  {
    path: "/reviewer-cam",
    name: "ReviewerCam",
    icon: "ni ni-circle-08 text-pink",
    component: <ReviewerCam />,
    layout: "/admin",
  },
];
export default routes;
