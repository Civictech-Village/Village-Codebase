import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <div style={{width:"100%"}}>
            <form style={{border:'0', margin:'0', width:'100%', }}>
            <div className="searchBar" style={{display:'flex', backgroundColor:'white', padding:'5px', alignItems:'center', width:"98%"}}>
                <SearchIcon sx={{color:"grey", marginRight:'10px'}}></SearchIcon>
                <input placeholder="Search People" style={{ width:"100%"}}/>
                </div>
            </form>
        </div>
    )
}