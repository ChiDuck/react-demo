import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import LoginModal from "../components/LogInModal";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import SignupModal from "../components/SignUpModal";
import { getSalonAPI } from "../config/apiCalls";
import { saveUserToStorage } from "../pages/localStorage";
import "../styles/Header.scss";

function Logo() {
  return (
    <Link to="/">
      <div className="logo">
        <img src="/logo/logonail.svg" alt="nail360" />
      </div>
    </Link>
  );
}

export default function HeaderBar() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const fetchLogin = async () => {
    const res = await getSalonAPI({
      s: "GetUserDetail",
      user: true,
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }
    saveUserToStorage(res.data[0]);
  };

  function handleLogInClick() {
    console.log("Log In clicked");
    setIsLoginVisible(true);
  }

  function handleSignUpClick() {
    console.log("Sign Up clicked");
    setIsSignupVisible(true);
  }

  function handleSidebarClick() {
    setIsSidebarVisible(true);
  }
  return (
    <>
      <SideBar
        onLoginClick={handleLogInClick}
        onSignupClick={handleSignUpClick}
        setIsSidebarVisible={setIsSidebarVisible}
        isSidebarVisible={isSidebarVisible}
      />
      <LoginModal
        setIsLoginVisible={setIsLoginVisible}
        isLoginVisible={isLoginVisible}
      />
      <SignupModal
        setIsSignupVisible={setIsSignupVisible}
        isSignupVisible={isSignupVisible}
      />

      <div className="header-bar">
        <div className="header-top">
          <Logo />
          <div className="spacer">
            <SearchBar />
            <div className="header-buttons">
              <Button
                className="pro-button"
                text="Nail360 PRO For Businesses"
              />
              <Button
                className="login-button"
                text="Log In"
                onClick={() => fetchLogin()}
              />
              <Button
                className="signup-button"
                text="Sign Up"
                onClick={handleSignUpClick}
              />
            </div>
            <Button
              className="sidebar-button"
              onClick={handleSidebarClick}
              text="&#9776;"
            />
          </div>
        </div>
      </div>
    </>
  );
}
