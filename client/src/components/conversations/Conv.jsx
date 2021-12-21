import axios from "axios";
import { useEffect, useState } from "react";
import "./conv.css";

export default function Conv({ conversation, curretnUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== curretnUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5656/api/users?userId=${friendId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log("err:", err);
      }
    };
    getUser();
  }, [conversation, curretnUser]);
  return (
    <div className="conversation">
      <img
        src="/profile5.jpg"
        src={user?.profilePicture ? user.profilePicture : "/profile5.jpg"}
        alt=""
        className="conversationimg"
      />
      <span className="conversationname">{user?.username}</span>
    </div>
  );
}
