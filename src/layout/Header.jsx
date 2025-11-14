import ContentSection from "../components/ContentSection";
import { Children, useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import "../styles/Header.scss";
import SideBar from "../components/SideBar";

function PageHeader({ children }) {
  return (
    <div className="pageheader">
      {Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  );
}

export default function Header() {
  return (
    <>
      <ContentSection>
        <PageHeader>
          <div className="header-banner">
            <img
              className="banner-img"
              src="pictures\header-banner.png"
              alt="banner"
            />
            <div className="banner-text">
              <h1>Your Freedom to Creativity</h1>
              <p>
                A cross-platform for making salons anywhere for all creators!
              </p>
            </div>
          </div>
        </PageHeader>
      </ContentSection>
    </>
  );
}
