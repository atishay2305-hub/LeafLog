import React, { ReactNode } from "react";

interface ErrorMessageProps {
  variant?: string;
  children: ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  variant = "info",
  children,
}) => {
  let alertClasses = "px-4 py-3 rounded relative";
  let textClasses = "block sm:inline-block mr-auto";

  switch (variant) {
    case "success":
      alertClasses += " bg-green-100 text-green-900";
      break;
    case "error":
      alertClasses += " bg-red-100 text-red-900";
      break;
    case "warning":
      alertClasses += " bg-yellow-100 text-yellow-900";
      break;
    default:
      alertClasses += " bg-blue-100 text-blue-900";
  }

  return (
    <div className={alertClasses}>
      <span className={textClasses}>
        <strong>{children}</strong>
      </span>
    </div>
  );
};

export default ErrorMessage;
