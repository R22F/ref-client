import {useEffect} from "react";
import {SignUpBox} from "../../components/auth/SignUpBox";
import {useNavigate} from "react-router-dom";
import {hasToken} from "../../components/auth/HasToken";

export const SignUp = () => {
  const isLogin = hasToken();
  const navigate = useNavigate();
  useEffect(() => {
  // 페이지 전환 시 로그인 체크
    if (isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SignUpBox />;
};
