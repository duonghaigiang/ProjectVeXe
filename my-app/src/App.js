import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/context/auth/authContext";
import DashboardLayout from "./components/model/dashboarch/dashboarchLayout";
import DashboarchPage from "./pages/dashboarch/dashboarchInforPage";
import DashboardCaterogy from "./pages/dashboarch/dashboardCaterogy";
import DashboardPostStation from "./pages/dashboarch/dashboardPostStation";
import Home from "./pages/home/Home";
import LoginPages from "./pages/login/LoginPages";
import RegisterPage from "./pages/register/registerPage";
import Trip from "./pages/trip/Trip";
import HomeTrip from "./pages/home/HomeStation";
import DashboarchListUser from "./pages/dashboarch/dashboarchListUser";
import Posts from "./pages/posts/posts";
import DashboarchTicket from "./pages/dashboarch/dashboarchTicket";
import Forget from "./pages/forget/forget";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/registerPage"
            element={<RegisterPage></RegisterPage>}
          ></Route>

          <Route path="/trip" element={<HomeTrip></HomeTrip>}></Route>
          <Route path="/loginPage" element={<LoginPages></LoginPages>}></Route>
          <Route path="/forgetPage" element={<Forget></Forget>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboarchPage></DashboarchPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<DashboardPostStation></DashboardPostStation>}
            ></Route>
            <Route
              path="/manage/category"
              element={<DashboardCaterogy></DashboardCaterogy>}
            ></Route>
            <Route
              path="/manage/user"
              element={<DashboarchListUser></DashboarchListUser>}
            ></Route>
            <Route path="/adminPosts" element={<Posts></Posts>}></Route>
            <Route
              path="/ticket"
              element={<DashboarchTicket></DashboarchTicket>}
            ></Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
