import BlockParty from "../../assets/BlockParty.jpg";
import BlockParty2 from "../../assets/BlockParty2.jpg";
import Logo from "../../assets/transparent 3.png"
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding:'150px',
        height:'100%'
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width:'90%',
          paddingLeft:'6em'
        }}
      >
        <div style={{textAlign:'center', width:'30%', display:'flex', justifyContent:'center', paddingLeft:'100px', height:'fit-content'}}>
          <img style={{height:'200px'}} src={Logo}></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            width: "80%",
          }}
        >
          <h3 style={{ width: "60%", fontWeight:'bolder'}}>
            Build Thriving Communities. Address Local Issues. Join Our Village.
          </h3>
          <p style={{ width: "70%", height: "72px", fontWeight:'normal'}}>
            Connect with like-minded indiviuals and create positive change
            together.
          </p>
        </div>
        <div
          style={{
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link to='/sign-up'><button className="btn btn-primary">Get Started</button></Link>
          <Link to='/login' style={{marginLeft:'1em'}}>Or Login</Link>
        </div>
      </div>
      <div
        id="card1"
        style={{
          background: `url(${BlockParty})`,
          width: "300px",
          height: "440px",
          borderRadius: "30px",
          filter: "drop-shadow(0px 18px 28px rgba(43, 103, 218, 0.12))",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        id="card2"
        style={{
          background: `url(${BlockParty2})`,
          width: "300px",
          height: "440px",
          borderRadius: "30px",
          filter: "drop-shadow(0px 18px 28px rgba(43, 103, 218, 0.12))",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
