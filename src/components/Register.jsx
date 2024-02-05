import { useState, useEffect } from "react";
import { registerFields } from "../constants/FormField";
import FormAction from "../components/FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = registerFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Register() {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState(fieldsState);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => setRegisterState({ ...registerState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerState);
    createAccount();
  };

  // handle Signup API Integration here
  const createAccount = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: registerState.fullname,
          email: registerState.email,
          password: registerState.password,
          confirm_password: registerState.confirm_password,
        }),
      });

      console.log("Response from server:", response);
      const data = await response.json();
      if (data.success) {
        setRegistrationSuccess(true);
        toast.success("Registration successful! Please login.");
      } else {
        toast.error(data.message);
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
      }, 3000);

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
          <Input
            key={field.id}
            handleChange={handleChange}
            value={registerState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        {registrationSuccess ? null : <div className="text-red-500">{registerState.password !== registerState.confirm_password && "Confirmation Password does not match!"}</div>}
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
