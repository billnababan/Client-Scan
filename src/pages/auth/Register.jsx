import Header from "../../components/Header";
import Register from "../../components/Register";
import { TypeAnimation } from "react-type-animation";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center loginBg">
      <div className="px-4 py-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="max-w-md w-full space-y-8 overflow-hidden">
          <Header
            heading={[<TypeAnimation key="unique-key" sequence={["Create an account", 600, "Fill in the data below!", 500]} cursor={true} repeat={Infinity} />]}
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/login"
          />
          <Register />
        </div>
      </div>
    </div>
  );
}
