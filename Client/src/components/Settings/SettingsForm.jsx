import { useState } from "react";
import CurrentUserContext from "../../contexts/current-user-context";
import { useContext } from "react";
export default function SettingsForm({handleFormSubmit}) {
  const { currentUser } = useContext(CurrentUserContext)
  const handleReset = (e) => {
    console.log(e.target)
    document.getElementById('settingsForm').reset()
  }
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [gender, setGender] = useState();
  const [bio, setBio] = useState();

  const changeFullName = (e) => {
    setFullName(e.target.value)
  }
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changeUsername = (e) => {
    setUsername(e.target.value)
  }
  const changeGender = (e) => {
    setGender(e.target.value)
  }
  const changeBio = (e) => {
    setBio(e.target.value)
  }

  const handleSubmit = async() => {
    const infoToPost = {}
    if(fullName !== '') {
      infoToPost["fullName"] = fullName
    } else {
      infoToPost["fullName"] = currentUser.fullName || null
    }

    if(email !== '') {
      infoToPost["email"] = email
    } else {
      infoToPost["email"] = currentUser.email || null
    }

    if(username !== '') {
      infoToPost["username"] = username
    } else {
      infoToPost["username"] = currentUser.username || null
    }

    if(gender !== '') {
      infoToPost["gender"] = gender
    } else {
      infoToPost["gender"] = currentUser.gender || null
    }

    if(bio !== '') {
      infoToPost["bio"] = bio
    } else {
      infoToPost["bio"] = currentUser.bio || null
    }
   
    const result = await fetch(`/api/users/${currentUser.id}`, {method:"PATCH", body: JSON.stringify(infoToPost), headers: { 'Content-type': `application/json; charset=UTF-8` }})
  }

  return (
    <form id="settingsForm" style={{ border: 0, width: "100%" }} onSubmit={handleFormSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "24px",
        }}
      >
        <div>
          <label style={{ marginBottom: "8px" }} >Full name</label>
          <input
          onChange={changeFullName}
            className="placeHolder"
            placeholder="Please enter your full name"
            name="fullname"
            type="text"
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
          <label style={{ marginBottom: "8px" }} >Email</label>
          <input
            onChange={changeEmail}
            className="placeHolder"
            placeholder="Please enter your email"
            name="email"
            type="email"
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
           onChange={changeUsername}
            className="placeHolder"
            placeholder="Please enter your username"
            name="username"
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
          <label style={{ marginBottom: "8px" }}>Gender</label>
          <input
          onChange={changeGender}
            className="placeHolder"
            placeholder="Please enter your gender"
            name="gender"
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
        onChange={changeBio}
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
        <button type="submit" onClick={handleSubmit} style={{marginRight:'20px', background:'#29B94A', color:'white', padding:'10px 20px'}} class="btn">
          Update Profile
        </button>
        <button type="button" class="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
