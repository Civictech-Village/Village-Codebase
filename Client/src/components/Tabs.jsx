import StickyBox from "react-sticky-box";
export default function Tabs({ handlePopular, handleMyVillage, activeTab }) {
  return (
    <StickyBox
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "1px",
        zIndex: "1000",
        backgroundColor: "#F5F5F5",
        opacity: "0.87",
      }}
    >
      <ul
        className="nav nav-tabs"
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <li className="nav-item">
          <button
            style={{ fontSize: "40px" }}
            className={`nav-link ${activeTab === "popular" ? "active" : ""}`}
            onClick={handlePopular}
            aria-current="page"
          >
            Popular
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ fontSize: "40px" }}
            className={`nav-link ${activeTab === "myVillage" ? "active" : ""}`}
            onClick={handleMyVillage}
            href="#"
          >
            My Villages
          </button>
        </li>
      </ul>
    </StickyBox>
  );
}
