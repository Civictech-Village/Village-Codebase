export default function SettingsTabs() {
  return (
    <ul
      className="nav nav-underline"
      style={{
        width: "75%",
        display: "flex",
        justifyContent: "center",
        paddingBottom:'2px',
        borderBottom:'2px solid #E0E4EC'
      }}
    >
      <li className="nav-item">
        <a
          style={{ fontSize: "20px" }}
          className="nav-link active"
          aria-current="page"
          href="#"
        >
          Account Setting
        </a>
      </li>
      <li className="nav-item">
        <a style={{ fontSize: "20px" }} className="nav-link" href="#">
          Login & Security
        </a>
      </li>
      <li className="nav-item">
        <a style={{ fontSize: "20px" }} className="nav-link" href="#">
          Notifications
        </a>
      </li>
      <li className="nav-item">
        <a style={{ fontSize: "20px" }} className="nav-link" href="#">
          Interface
        </a>
      </li>
    </ul>
  );
}
