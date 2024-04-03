import React, { ReactNode } from "react";
import { Alert } from "react-bootstrap";

interface ErrorMessageProps {
  variant?: string;
  children: ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
