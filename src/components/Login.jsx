// ...
import { useState, useEffect } from "react"; // Import useState dan useEffect
import { loginFields } from "../constants/FormField";
import Input from "./Input";
import FormAction from "../components/FormAction";
import FormExtra from "../components/FormExtra";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Loading from "./Loading"; // Import komponen Loading
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import Header from "../components/Header"; // Import komponen Header
import { TypeAnimation } from "react-type-animation";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user-dashboard";
  const [loading, setLoading] = useState(false); // State untuk menunjukkan loading
  const [showPassword, setShowPassword] = useState(false); // State untuk menampilkan atau menyembunyikan sandi
  const [formData, setFormData] = useState({
    email: localStorage.getItem("rememberMe") ? localStorage.getItem("email") || "" : "",
    password: localStorage.getItem("rememberMe") ? localStorage.getItem("password") || "" : "",
  }); // Gunakan nilai email dan password dari localStorage jika rememberMe disetel
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberMe")); // Ubah string menjadi boolean

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); // Menetapkan loading menjadi true saat memulai perminta

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", formData.email); // Simpan nilai email ke localStorage
      localStorage.setItem("password", formData.password); // Simpan nilai password ke localStorage
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email"); // Hapus nilai email dari localStorage
      localStorage.removeItem("password"); // Hapus nilai password dari localStorage
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

      // Set header Authorization dengan token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Login berhasil!");
      console.log("Nilai access:", access);

      // Periksa peran pengguna dan arahkan sesuai dengan peran
      if (parseInt(access) === parseInt(ROLES.CLIENT)) {
        console.log("Arahkan ke user-dashboard");
        setTimeout(() => navigate("/user-dashboard", { replace: true }), 2000); // Navigate ke user-dashboard setelah 3 detik
      } else if (parseInt(access) === parseInt(ROLES.ADMIN)) {
        console.log("Arahkan ke admin-dashboard");
        setTimeout(() => navigate("/admin-dashboard", { replace: true }), 2000); // Navigate ke admin-dashboard setelah 3 detik
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
    setTimeout(() => {
      setLoading(false); // Atur loading menjadi false setelah permintaan selesai, baik berhasil atau gagal
    }, 2000);
  };

  useEffect(() => {
    // Reset form data saat komponen dimuat
    setFormData({
      email: localStorage.getItem("rememberMe") ? localStorage.getItem("email") || "" : "",
      password: localStorage.getItem("rememberMe") ? localStorage.getItem("password") || "" : "",
    });
  }, []); // Jalankan sekali saat komponen dimuat

  return (
    <>
      <div className={`mt-8 space-y-6   ${loading ? "opacity-0 pointer-events-none" : ""}`} style={{ display: loading ? "none" : "block" }}>
        {" "}
        {/* Menyembunyikan form saat loading */}
        <Header heading={[<TypeAnimation sequence={["Login!", 600, "Fill Data", 600, "Correctly!!", 600]} cursor={true} repeat={Infinity} />]} paragraph="Don't have an account yet? " linkName="Register" linkUrl="/register" />
        <form onSubmit={handleSubmit}>
          <div className="-space-y-px">
            {loginFields.map((field) => (
              <div key={field.id} className="relative">
                <Input
                  handleChange={handleChange}
                  value={formData[field.id]}
                  labelText={field.labelText}
                  labelFor={field.id}
                  id={field.id}
                  name={field.name}
                  type={field.type === "password" && !showPassword ? "password" : "text"}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
                {field.type === "password" && (
                  <button type="button" className="absolute inset-y-0 right-0 px-2 py-1 " onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
            ))}
          </div>
          <FormExtra rememberMe={rememberMe} setRememberMe={setRememberMe} /> {/* Pass props ke FormExtra */}
          <FormAction text="Login" />
        </form>
      </div>
      {loading && <Loading size={100} />}
    </>
  );
};
export default Login;
