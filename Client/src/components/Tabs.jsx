import StickyBox from "react-sticky-box";
export default function Tabs() {
  return (
    <StickyBox style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "1px",
        zIndex:'1000',
        backgroundColor:'#F5F5F5',
        opacity:'0.87'
      }}>
      <ul
        className="nav nav-tabs"
        style={{
          width: "75%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <li className="nav-item">
          <a style={{fontSize:'40px'}} className="nav-link active" aria-current="page" href="#">
            Popular
          </a>
        </li>
        <li className="nav-item">
          <a style={{fontSize:'40px'}} className="nav-link" href="#">
            My Villages
          </a>
        </li>
      </ul>
    </StickyBox>
  );
}
