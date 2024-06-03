import { useState, useEffect } from "react";
import { registerFields } from "../constants/FormField";
import FormAction from "../components/FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const fields = registerFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Register() {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState(fieldsState);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegisterState({ ...registerState, [id]: value });

    // Validasi password
    if (id === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setPasswordValid(passwordRegex.test(value));
    }

    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(value));
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerState);
    if (emailValid && passwordValid) {
      // Menambahkan kondisi passwordValid
      createAccount();
    } else {
      if (!emailValid) {
        toast.error("Invalid email format");
      }
      if (!passwordValid) {
        toast.error("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
      }
    }
  };

  // handle Signup API Integration here
  const createAccount = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", {
        fullname: registerState.fullname,
        email: registerState.email,
        password: registerState.password,
        confirm_password: registerState.confirm_password,
      });

      console.log("Response from server:", response.data);
      if (response.data.success) {
        setRegistrationSuccess(true);
        toast.success("Registration successful! Please login.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    // Check if registration was successful and then navigate
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);

      // Clear the timeout in case the component unmounts before the delay
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, navigate]);

  const handleLoginRedirect = () => {
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <form className="mt-2 space-y-6 " onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <div key={field.id} className="relative">
            <Input
              handleChange={handleChange}
              value={registerState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type === "password" && !showPassword ? "password" : "text"}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
            {field.type === "password" && (
              <button type="button" className="absolute inset-y-0 right-0 px-2 py-1" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </div>
        ))}
        {!passwordValid && registerState.password && (
          <div className="text-red-500 text-[12px]">Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.</div>
        )}
        {!emailValid && registerState.email && <div className="text-red-500">Invalid email format</div>}
        {registrationSuccess ? null : registerState.confirm_password && registerState.password !== registerState.confirm_password ? <div className="text-red-500 text-[12px]">Confirmation Password does not match!</div> : null}
        <FormAction handleSubmit={handleSubmit} text="Register" className="mt-1" />
      </div>
      {registrationSuccess && (
        <div>
          <p>Sudah memiliki akun? </p>
          <button type="button" onClick={handleLoginRedirect} className="text-blue-500 hover:underline">
            Login
          </button>
        </div>
      )}
    </form>
  );
}
