import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Beranda from "./pages/landing-pages/Beranda";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import Dashboard from "./pages/userDashboard/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./Layout";
import RequireAuth from "./Routing-Middleware/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import ManageUser from "./pages/adminDashboard/ManageUser";
import ManageData from "./pages/adminDashboard/ManageData";
import RepoStorage from "./pages/userDashboard/RepoStorage";
import Profile from "./pages/userDashboard/Profile";

const ROLES = {
  CLIENT: "8912",
  ADMIN: "6501",
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Beranda />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-dashboard/manage-user" element={<ManageUser />} />
              <Route path="/admin-dashboard/manage-data" element={<ManageData />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.CLIENT]} />}>
              <Route path="/user-dashboard" element={<Dashboard />} />
              <Route path="/repo" element={<RepoStorage />} />

              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Public Access */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
