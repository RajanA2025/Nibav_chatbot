import Inter from "../public/static/fonts/Inter.ttf";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/bodyComponents/Loader"; 
import AdminLogin from "./components/View/Account/AdminLogin";
import Adminactivity from "./components/bodyComponents/Home/Adminactivity";
// const Loader = lazy(() => import("./components/bodyComponents/Loader"));
const RootComponent = lazy(() => import("./components/RootComponent"));
const RootPage = lazy(() => import("./components/RootPage"));
const Home = lazy(() => import("./components/bodyComponents/home/Home"));
const Dashboard =lazy(()=>import("./components/bodyComponents/Home/Dashboard"))


const LandingPage = lazy(() => import("./components/View/LandingPage"));
const SignIn = lazy(() => import("./components/View/Account/Login")); 
const SignUp = lazy(() => import("./components/View/Account/Signup"));
const ResetPassword = lazy(() => import("./components/View/Account/ChangePassword"));
const ForgotPassword = lazy(() => import("./components/View/Account/ForgotPassword"));
const Users = lazy(()=>import("./components/bodyComponents/Home/users"))
const ViewUsers = lazy(()=>import("./components/bodyComponents/Home/ViewUser"))
const theme = createTheme({
  spacing: 4,
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${Inter}) format('truetype');
          unicodeRange: U+0000-00FF;
        }
      `,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={
          <Suspense fallback={<div><Loader /></div>}>
            <LandingPage />
          </Suspense>
        } /> 
        
        {/* <Route path="/productDashboard" element={
          <Suspense fallback={<div><Loader /></div>}>
            <CardGrid />
          </Suspense>
        } /> */}
        <Route path="/adminLogin" element={
          <Suspense fallback={<div><Loader /></div>}>
            <AdminLogin />
          </Suspense>
        } /> 
         <Route path="/salesLogin" element={
          <Suspense fallback={<div><Loader /></div>}>
            <AdminLogin />
          </Suspense>
        } /> 
        
      
      <Route path="/user" element={
        <Suspense fallback={<div><Loader /></div>}>
          <RootComponent />
        </Suspense>
      }>
        <Route index element={
          <Suspense fallback={<div><Loader /></div>}>
            <RootPage />
          </Suspense>
        } />
        
        <Route path="Dashboard" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Home/>
          </Suspense>
        } />
        <Route path="home" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Home/>
          </Suspense>
        } />
        
       
      </Route>
      <Route path="/account" >
        <Route path="login" element={
          <Suspense fallback={<div><Loader /></div>}>
            <SignIn />
          </Suspense>
        } />
        <Route path="signup" element={
          <Suspense fallback={<div><Loader /></div>}>
            <SignUp />
          </Suspense>
        } />
        <Route path="resetpassword" element={
          <Suspense fallback={<div><Loader /></div>}>
            <ResetPassword />
          </Suspense>
        } />
        <Route path="forgotpassword" element={
          <Suspense fallback={<div><Loader /></div>}>
            <ForgotPassword />
          </Suspense>
        } />
      </Route>
   
      <Route path="/admin" element={
        <Suspense fallback={<div><Loader /></div>}>
          <RootComponent />
        </Suspense>
      }>
        
        
        <Route path="dashboard" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Dashboard/>
          </Suspense>
        } />
        <Route path="activity" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Adminactivity/>
          </Suspense>
        } />
         <Route path="Users" element={
          <Suspense fallback={<div><Loader /></div>}>
            <ViewUsers/>
          </Suspense>
          
        } />
        <Route path="ChatUsers" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Users/>
          </Suspense>
          
        } />
        
       
       
       
      </Route>
      <Route path="/sales" element={
        <Suspense fallback={<div><Loader /></div>}>
          <RootComponent />
        </Suspense>
      }>
        
        
        <Route path="dashboard" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Dashboard/>
          </Suspense>
        } />
        <Route path="activity" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Adminactivity/>
          </Suspense>
        } />
         <Route path="ChatUsers" element={
          <Suspense fallback={<div><Loader /></div>}>
            <Users/>
          </Suspense>
        } />
       
       
       
      </Route>
    </>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
