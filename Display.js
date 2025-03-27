import { useNavigate, useParams} from "react-router-dom";
import useFetch from "./useFetch";

const Display = () => {
    const { id } = useParams();
    console.log("Fetching profile for ID:", id);
    const { data: profiles, isPending } = useFetch(
       `http://localhost:8000/profiles/${id}`
    );
    
    const navigate = useNavigate();
    const handleNewProfile = () => {
        navigate("/");
    }
    console.log("Profile ID:", id);
    return ( 
        <div className="info-sheet">
            {isPending && <div>Loading...</div>}
            <h2>Welcome</h2>
            <div className="Name">
            {profiles && (
                <h4>{profiles.fName} {profiles.lName}</h4>
            )}
            </div>
            <div className="bio">
            {profiles && (<div>
                <p id="lab">Bio</p>
                <p>{profiles.bio}</p></div>
            )}
            </div>
            <div className="contact">
            {profiles && (<div><p id="lab">Contact me at</p>
                <p>{profiles.phoneNum}<br></br>{profiles.email}</p></div>
            )}
            </div>
            <button onClick = {handleNewProfile}>Create new profile</button>
        </div>
        
     );
}
 
export default Display;