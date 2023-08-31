import { useState } from "react";
import { Modal } from "../modal/Modal";
import { SignInBox } from "./SignInBox";
interface testButtonProps {
  onClick?: () => void;
}
const TestButton = ({ onClick }: testButtonProps) => {
  return <button onClick={onClick}>Test Modal Button</button>;
};

export const SignIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TestButton
        onClick={() => {
          setIsModalOpen(true);
          console.log(isModalOpen);
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        children={<SignInBox />}
      />
      <br />
    </>
  );
};
