import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from "../../assets/transparent 3 (1).png";
export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div id="Links" style={{ display: "flex", flexDirection: "column", marginTop:'20px' }}>
        <h4>Links</h4>
        <a>About Us</a>
        <a>Terms of Service</a>
        <a>Privacy Policy</a>
      </div>
      <div id="Media" style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <img src={Logo} />
        </div>
        <div style={{width:'100%', display:'flex', justifyContent:'space-around'}}>
          <TwitterIcon />
          <GitHubIcon />
          <InstagramIcon />
          <LinkedInIcon />
          <FacebookIcon />
        </div>
      </div>
      <div id="Contacts" style={{ display: "flex", flexDirection: "column", marginTop:'15px' }}>
        <h4>Contact Us</h4>
        <p>Brooklyn, New York</p>
        <p>MarcyLab@gmail.com</p>
        <p>1+ 888-888-8888</p>
      </div>
    </div>
  );
}
