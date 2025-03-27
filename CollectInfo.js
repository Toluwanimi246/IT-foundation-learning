import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CollectInfo = () => {

const navigate = useNavigate();

const handleSubmit = (e) => {
e.preventDefault();
const profiles = { fName, lName, bio, phoneNum, email, gender };
fetch("http://localhost:8000/profiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profiles),
  }).then((res) => res.json())
    .then((newProfile) => {
    console.log("New profile created:", newProfile);
    setIsPending(false);
    navigate(`/profiles/${newProfile.id}`);  })
  
}

const [isPending, setIsPending] = useState(false);
const [fName, setfName] = useState("");
const [lName, setlName] = useState("");
const [bio, setBio] = useState("");
const [phoneNum, setPhoneNum] = useState("");
const [email, setEmail] = useState("");
const [gender, setGender] = useState("Male");

    return ( 
        <div className="contains">
            <h2>Create a Profile</h2>
            <div className="form-body">
                <form onSubmit ={handleSubmit}>
                    <label>Firstname</label>
                    <input type="text" required
                    value={fName}
                    onChange={(e) => setfName(e.target.value)}
                    ></input>
                    <label>Lastname</label>
                    <input type="text" required
                    value={lName}
                    onChange={(e) => setlName(e.target.value)}
                    ></input>
                    <label>Bio</label>
                    <textarea required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <label>Phone Number</label>
                    <input type="text" required
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    ></input>
                    <label>Email</label>
                    <input type="email" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
                
                <label>Gender</label>
                <select>
                    <option value="Male" onChange={(e) => setGender(e.target.value)}>Male</option>
                    <option value ="Female" onChange={(e) => setGender(e.target.value)}>Female</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
                </form>
            </div>
            
        </div>
        
     );
}
 
export default CollectInfo;