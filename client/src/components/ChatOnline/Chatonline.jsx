import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css";

export default function Chatonline({ onlineusers, currentId, setCurretChat }) {
  const [friends, setfriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `http://localhost:5656/api/users/friends/${currentId}`
      );
      setfriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineusers.includes(f._id)));
  }, [friends, onlineusers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:5656/api/conversations/find/${currentId}/${user._id}`
      );
      setCurretChat(res.data);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <div className="chatonline">
      {onlineFriends.map((o) => (
        <div className="chatonlinefriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineContainer">
            <img
              src={o?.profilePicture ? o.profilePicture : "/profile3.jpg"}
              alt=""
              className="chatImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}
