import { useEffect, useState } from "react";
import { SignUpBox } from "../../components/auth/SignUpBox";
import { useRecoilValue } from "recoil";
import { Login } from "../../recoil/DBAtom";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const isLogin = useRecoilValue(Login);
  const navigate = useNavigate();
  // 페이지 전환 시 로그인 체크
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  return <SignUpBox />;
};
