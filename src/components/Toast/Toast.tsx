import React, { useEffect } from "react";
import styled, { css } from "styled-components";

const ToastContainer = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) =>
    props.type === "success"
      ? css`
          background-color: #4caf50;
        `
      : css`
          background-color: #f44336;
        `}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
`;

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer data-testid="toast" type={type}>
      {message}
      <CloseButton onClick={onClose}>×</CloseButton>
    </ToastContainer>
  );
};

export default Toast;
