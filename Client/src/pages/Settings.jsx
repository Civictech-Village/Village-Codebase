import SettingsTabs from "../components/Settings/SettingsTabs";
import SettingsProfile from "../components/Settings/SettingsPicture";
import SettingsForm from "../components/Settings/SettingsForm";
import SearchBar from "../components/NavBar";
import Avatar from "../components/Avatar";
import Footer from "../components/LandingPage/Footer";

export default function Settings() {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const fullnameUpdated = e.target.fullname.value;
    const emailUpdated = e.target.email.value;
    const genderUpdated = e.target.gender.value;
    const usernameUpdated = e.target.username.value;

    console.log(e.target.fullname.value);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "fit-content",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <SearchBar />
        <Avatar />
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          flexDirection: "row-reverse",
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundColor: "#F7F7F8",
            height: "100%",
            width: "97%",
            boxShadow:
              "0px 0px 30px rgba(170, 170, 170, 0.16), 0px 10px 20px rgba(194, 194, 194, 0.16)",
            borderRadius: "10px",
            padding: "18px 15px",
          }}
        >
          <div style={{ width: "90%", marginTop: "2em" }}>
            <SettingsTabs />
          </div>
          <div style={{ width: "100%", borderBottom: "2px solid #E0E4EC" }}>
            <SettingsProfile />
          </div>
          <div style={{ marginTop: "3em" }}>
            <SettingsForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Footer />
      </div>
    </div>
  );
}
