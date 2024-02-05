import { useState } from "react";

const FormExtra = ({ rememberMe, setRememberMe }) => {
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" checked={rememberMe} onChange={handleRememberMeChange} />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <a href="#" className="font-medium text-[#010851] hover:text-gray-500">
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default FormExtra;
