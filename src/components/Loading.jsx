import React from "react";

const Loading = ({ size }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-100 z-100">
      <div style={{ width: `${size}px`, height: `${size}px` }} className="animate-spin">
        <div className="h-full w-full border-4 border-t-purple-500 border-b-purple-700 rounded-[50%]"></div>
      </div>
    </div>
  );
};

export default Loading;
