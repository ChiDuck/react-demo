import "../styles/SideBar.scss";
export default function SideBar({
  onLoginClick,
  onSignupClick,
  setIsSidebarVisible,
  isSidebarVisible,
}) {
  return (
    <>
      <div className={`overlay ${isSidebarVisible ? "open" : ""}`}> </div>
      <div className={`sidebar-menu ${isSidebarVisible ? "open" : ""}`}>
        <button
          className="close-button"
          onClick={() => setIsSidebarVisible(false)}
        >
          &#10005;
        </button>
        <ul>
          <li>Nail360 PRO For Businesses</li>
          <li onClick={() => onLoginClick()}>Log In</li>
          <li onClick={() => onSignupClick()}>Sign Up</li>
        </ul>
      </div>
    </>
  );
}
