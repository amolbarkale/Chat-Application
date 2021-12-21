import "./profile.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import RightPart from "../../components/rightpart/RightPart";
import Feed from "../../components/feed/Feed";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
export default function Profile() {
    const [user, setUser] = useState({});
    console.log('user:', user)
    const base = "http://localhost:5656/api/"
    const username = useParams().username;

    useEffect(() => {

        const fetchUser = async () => {
            const res = await axios.get(`${base}users?username=${username}`)
            setUser(res.data)
        }
        fetchUser();
    }, [username]);

    return (
        <div>
           <>
            <Topbar />
            <div className="Profile">
                    <Sidebar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img className="profileCoverImg"
                                    src={user.profilePicture || "/logo192.png"} alt="" />
                                <img className="profileUserImg"
                                    src={user.coverPicture  || "/logo192.png"} alt="" />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{ user.username}</h4>
                                <span className="profileInfoDescription">{ user.desc}</span>

                            </div>
                        </div>
                        <div className="profileRightTobottom">
                            <Feed username={ username}/>
                            <RightPart user={ user}/>
                        </div>
            
                    </div>
            </div>
        </> 
        </div>
    )
}
