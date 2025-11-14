import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import SideBar from "../components/SideBar";
import "../styles/Header.scss";

function Logo() {
  return (
    <div className="logo">
      <img src="logo/logonail.svg" alt="React Logo" />
    </div>
  );
}

export default function HeaderBar() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
                onClick={handleLogInClick}
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
