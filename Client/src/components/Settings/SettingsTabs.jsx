export default function SettingsTabs() {
  return (
    <ul
      className="nav nav-underline"
      style={{
        width: "75%",
        display: "flex",
        justifyContent: "flex-start",
        paddingBottom:'2px',
        borderBottom:'2px solid #E0E4EC'
      }}
    >
      <li className="nav-item">
        <a
          style={{ fontSize: "20px", paddingLeft:'5px' }}
          className="nav-link active"
          aria-current="page"
          href="#"
        >
          Account Information
        </a>
      </li>
    </ul>
  );
}
