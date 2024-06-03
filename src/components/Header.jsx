import { Link } from "react-router-dom";
import logoLogin from "../assets/Logo-web.jpeg";

export default function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
  return (
    <div className="mb-10 text-center">
      <div className="flex justify-center">
        <img alt="" className="h-10 w-16 rounded-lg " src={logoLogin} />
      </div>
      <h2 className="mt-6 text-xl md:text-3xl lg:text-xl font-extrabold text-gray-900">{heading}</h2>
      <p className="mt-2 text-sm md:text-base text-gray-600">
        {paragraph}{" "}
        <Link to={linkUrl} className="font-medium text-gray-900 hover:text-gray-500">
          {linkName}
        </Link>
      </p>  
    </div>
  );
}
