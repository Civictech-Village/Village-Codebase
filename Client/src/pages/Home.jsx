import React from "react";

function HomePage() {
  return (
    <div style={{ backgroundColor: '#b2f1d5', padding: '20px' }}>
      <h1>
        Village
      </h1>
      <p>
        We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.
      </p>
    </div>
  );
}
function NYC() {
  return (
    <>
    <img src= "" alt="/home/vinny/Development/Village-Codebase/Client/src/pages/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg" />
    </>
  )
}


function Bio() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>Come together as a community, develop a Village</p>
      <button style={{ marginTop: '10px', backgroundColor: '#0d6efd', padding: '10px 30px', borderRadius: '25px', color: 'white', border: 'none' }}>
        Start a Village
      </button>
    </div>
  );
}



function App() {
  return (
    <>
      <HomePage />
      <NYC />
      <Bio />
    </>
  );
}

export default App;
