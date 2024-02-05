import { useState } from "react";
import { loginFields } from "../constants/FormField";
import Input from "./Input";
import FormAction from "../components/FormAction";
import FormExtra from "../components/FormExtra";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user-dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    const ROLES = {
      CLIENT: "8912",
      ADMIN: "6501",
    };

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", formData);

      const token = response?.data?.token;
      const access = response?.data?.access;

      const user = JSON.stringify(response?.data?.user);

      localStorage.setItem("token", token);
      localStorage.setItem("access", JSON.stringify(access));
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login berhasil!");
      console.log("Nilai access:", access);

      // Periksa peran pengguna dan arahkan sesuai dengan peran
      if (parseInt(access) === parseInt(ROLES.CLIENT)) {
        console.log("Arahkan ke user-dashboard");
        navigate("/user-dashboard", { replace: true });
      } else if (parseInt(access) === parseInt(ROLES.ADMIN)) {
        console.log("Arahkan ke admin-dashboard");
        navigate("/admin-dashboard", { replace: true });
      }

      // ...

      setAuth({ user, token, roles: access });
    } catch (error) {
      // Tangani kesalahan
      console.error("Error in handleSubmit:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error("Tidak dapat terhubung ke server!");
      } else {
        console.error("Other error:", error);
        toast.error("Kesalahan dalam menyiapkan permintaan!");
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {loginFields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={formData[field.id]}
            labelText={field.labelText}
            labelFor={field.id}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra rememberMe={rememberMe} setRememberMe={setRememberMe} /> {/* Pass props ke FormExtra */}
      <FormAction text="Login" />
    </form>
  );
};

export default Login;
