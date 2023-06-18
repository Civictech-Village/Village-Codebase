import gallery from "../../assets/gallery-add.png";
export default function SettingsProfile() {
  return (
    <div style={{ margin: "5em 2em"}}>
      <div>
        <h5>Your Profile Picture</h5>
        <div
          style={{
            width: "200px",
            height: "230px",
            border: "1px dashed #4C545F",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "25px",
          }}
        >
          <img src={gallery} alt="" />
          <p
            style={{
              lineHeight: "16px",
              textAlign: "center",
              width: "102.11px",
              marginTop: "15px",
            }}
          >
            Upload your Photo
          </p>
        </div>
      </div>
    </div>
  );
}
