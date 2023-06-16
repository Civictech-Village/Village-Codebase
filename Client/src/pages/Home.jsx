import { motion, useTransform, useScroll } from "framer-motion";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  return (
    <div>
    <div style={{ backgroundImage: `url("src/images/pexels-miki-czetti-111963.jpg")`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh" }}>

      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h1 style={{ color: "white", fontSize: "100px", textShadow: "5px 5px black" }}>Village</h1>
    
      </div>
      <div style={{ backgroundColor: "whitesmoke", height: "100vh" }}>
          <h1>We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.</h1>
      </div>
    </div>
  );
}
//   return (
//     <div style={{ backgroundColor: '#b2f1d5', padding: '20px' }}>
//       <h1 style={{textAlign:'center'}}>
//         Village
//       </h1>
//       <p>
// eslint-disable-next-line max-len
//         We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.
//       </p>
//     </div>
//   );
// }
// function NYC() {
//   return (
//     <div style={{width:"100%", display:'flex', justifyContent:'center', flexDirection:"column"}}>
// eslint-disable-next-line max-len
//     <img src= {Home} alt="/home/vinny/Development/Village-Codebase/Client/src/pages/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg" />
//     </div>
//   )
// }

// function Bio() {
//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <p>Come together as a community, develop a Village</p>
//       <Link to={'/organizations'}>
// eslint-disable-next-line max-len
//       <button style={{ marginTop: '10px', backgroundColor: '#0d6efd', padding: '10px 30px', borderRadius: '25px', color: 'white', border: 'none' }}>
//         Start a Village
//       </button>
//       </Link>
//     </div>
//   );
// }

// function App() {
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//   if (!currentUser) return <Navigate to="/landingpage" />;

//   return (
// eslint-disable-next-line max-len
//     <div style={{backgroundColor: '#b2f1d5', height:"100%", display:'flex', alignItems:'center', flexDirection:'column',justifyContent:'center'}}>
//       <HomePage />
//       <Bio />
//     </div>
//   );
