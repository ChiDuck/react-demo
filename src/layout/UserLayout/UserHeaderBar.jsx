import css from "../UserLayout/UserHeaderBar.module.scss";
export default function UserHeaderBar({ collapsed, setCollapsed }) {
  return (
    <header className={css.header}>
      <button onClick={() => setCollapsed(!collapsed)}>
        <img src="/icon/Group 353.svg" alt="" />
      </button>
      <div>
        <button>For businesses</button>
        <button>
          <img src="#" alt="" />
        </button>
        <button>
          <img src="/icon/Group 353.svg" alt="" />
        </button>
        <img className={css.avatar} src="/logo/logo.png" alt="" />
      </div>
    </header>
  );
}
