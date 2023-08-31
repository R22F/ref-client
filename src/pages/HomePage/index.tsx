import { SignIn } from "../../components/auth/SignIn";
import { Header } from "../../components/header/Header";

export const Homepage = () => {
    const logo = require('./cookingman.png')
  return (
    <>
      <img src={logo} alt="logo"/>
      <Header />
      <div>
        메인페이지
        <br />
        <SignIn />
      </div>

    </>
  );
};
