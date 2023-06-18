export default function SettingsForm() {
  const handleReset = (e) => {
    console.log(e.target)
    document.getElementById('settingsForm').reset()
  }
  return (
    <form id="settingsForm" style={{ border: 0, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "24px",
        }}
      >
        <div>
          <label style={{ marginBottom: "8px" }}>Full name</label>
          <input
            className="placeHolder"
            placeholder="Please enter your full name"
            style={{
              borderRadius: "8px",
              border: "1px solid #E0E4EC",
              background: "linear-gradient(0deg, #FAFBFC, #FAFBFC), #FFFFFF",
              width: "519px",
              height: "52px",
              padding: "15px",
            }}
          />
        </div>
        <div>
          <label style={{ marginBottom: "8px" }}>Email</label>
          <input
            className="placeHolder"
            placeholder="Please enter your email"
            style={{
              borderRadius: "8px",
              border: "1px solid #E0E4EC",
              background: "linear-gradient(0deg, #FAFBFC, #FAFBFC), #FFFFFF",
              width: "519px",
              height: "52px",
              padding: "15px",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <label style={{ marginBottom: "8px" }}>Username</label>
          <input
            className="placeHolder"
            placeholder="Please enter your username"
            style={{
              borderRadius: "8px",
              border: "1px solid #E0E4EC",
              background: "linear-gradient(0deg, #FAFBFC, #FAFBFC), #FFFFFF",
              width: "519px",
              height: "52px",
              padding: "15px",
            }}
          />
        </div>
        <div>
          <label style={{ marginBottom: "8px" }}>Phone Number</label>
          <input
            className="placeHolder"
            placeholder="Please enter your phone number"
            style={{
              borderRadius: "8px",
              border: "1px solid #E0E4EC",
              background: "linear-gradient(0deg, #FAFBFC, #FAFBFC), #FFFFFF",
              width: "519px",
              height: "52px",
              padding: "15px",
            }}
          />
        </div>
      </div>
      <div style={{ marginBottom: "3em", marginTop:'3em' }}>
        <label>Bio</label>
        <input
          className="placeHolder"
          placeholder="Describe Yourself"
          style={{
            background: "#FAFBFC",
            border: "1px solid #E0E4EC",
            borderRadius: "8px",
            width: "100%",
            height: "193px",
          }}
        />
      </div>

      <div>
        <button style={{marginRight:'20px', background:'#29B94A', color:'white', padding:'10px 20px'}} type="button" class="btn">
          Update Profile
        </button>
        <button type="button" class="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
