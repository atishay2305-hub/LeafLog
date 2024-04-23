import React from "react";

interface LoadingProps {
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({ size = 100 }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`animate-spin rounded-full border-t-4 border-blue-500 h-${size} w-${size}`}
      ></div>
    </div>
  );
};

export default Loading;
