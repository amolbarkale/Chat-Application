import "../Topbar/topbar.css";
import { Chat, Notifications, Search, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
export default function Topbar() {
  const [conversation, setConversation] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getIt = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5656/api/conversations/${user._id}`
        );
        console.log("res11:", res);
      } catch (err) {
        console.log("err:", err);
      }
    };
  }, [user._id]);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="search for friends,posts and videos"
            type="text"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"> Homepage </span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Link to="/dm">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          {" "}
          <img
            src={user.profilePicture || "/logo192.png"}
            alt="pic"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
