import Header from "../../components/Header";
import { TypeAnimation } from "react-type-animation";
import Login from "../../components/Login";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="px-4 py-8 bg-white rounded-lg shadow-xl w-full max-w-md">
          <Header heading={[<TypeAnimation sequence={["Login!", 600, "Fill Data", 600, "Correctly!!", 600]} cursor={true} repeat={Infinity} />]} paragraph="Don't have an account yet? " linkName="Register" linkUrl="/register" />
          <Login />
        </div>
      </div>
    </>
  );
}
