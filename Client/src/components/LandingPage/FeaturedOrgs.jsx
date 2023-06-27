import group from '../../assets/Group 10.png'
export default function Featured() {
  return (
    <div style={{ backgroundColor: "#b2f1d5", height: "600px", width: "100%", display:'flex', alignItems:'center', padding:'200px', justifyContent:'space-between' }}>
      <div style={{height:'248px'}}>
        <h2>Explore Our Thriving Villages</h2>
        <p style={{fontWeight:'bold', width:'500px'}}>
          Immerse yourself in the vibrant spirit of our largest and most active
          villages, where passionate individuals come together to make a lasting
          positive impact on their communities. Explore the diverse range of
          initiatives, engaging discussions, and collective efforts that shape
          these thriving villages.
        </p>
      </div>
      <div style={{width:'100%', display:'flex',justifyContent:'flex-end'}}>
        <img src={group}></img>
      </div>
    </div>
  );
}
