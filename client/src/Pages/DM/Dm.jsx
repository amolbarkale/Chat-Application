import { useContext, useEffect, useState } from "react";
import Chatonline from "../../components/ChatOnline/Chatonline";
import Message from "../../components/message/message";
import Conv from "../../components/conversations/Conv";
import { AuthContext } from "../../Context/AuthContext";
import dm from "./dm.css";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";

export const DMM = () => {
  const [conversation, setConversation] = useState([]);
  const [newmsg, setnewmsg] = useState("");
  const [arrivalmsg, setArrivalmsg] = useState(null);
  const [curretChat, setCurretChat] = useState([]);
  const [onlineusers, setonlineUsers] = useState([]);
  const scrollRef = useRef();
  const [messages, setmessages] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  console.log("user21:", user);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalmsg({
        seder: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalmsg &&
      curretChat?.members.includes(arrivalmsg.sender) &&
      setmessages((prev) => [...prev, arrivalmsg]);
  }, [arrivalmsg, curretChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log("users:", users);
      setonlineUsers(
        user.followins.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getIt = async () => {
      const res = await axios.get(
        `http://localhost:5656/api/conversations/${user._id}`
      );
      setConversation(res.data);
    };
    getIt();
  }, [user._id]);

  useEffect(() => {
    const getMessage = async () => {
      const res = await axios.get(
        `http://localhost:5656/api/message/${curretChat?._id}`
      );
      setmessages(res.data);
    };
    getMessage();
  }, [curretChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sms = {
      senderId: user._id,
      text: newmsg,
      conversationId: curretChat._id,
    };

    const receiverId = curretChat.members.find((member) => member !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newmsg,
    });
    try {
      const res = await axios.post("http://localhost:5656/api/message/", sms);
      setmessages([...messages, res.data]);
      setnewmsg("");
    } catch (err) {
      console.log("err:", err);
    }
  };

  useEffect(
    () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );
  return (
    <>
      <div className="messanger">
        <div className="chatmenu">
          <div className="chatmenuwrapper">
            <input
              className="chatmenuipt"
              type="text"
              placeholder=""
              serch
              frienmnd
            />
            {conversation.map((c) => (
              <div onClick={() => setCurretChat(c)}>
                <Conv conversation={c} curretnUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatbax">
          {curretChat ? (
            <>
              <div className="chatboxwrapper">
                <div className="chatboxtop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="charboxbottom">
                  <input
                    onChange={(e) => setnewmsg(e.target.value)}
                    value={newmsg}
                    className="chatmessageinput"
                    type="text"
                    placeholder="write something"
                  />
                  <button className="submitbtn" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <span className="noConv">Open a conversation to start a chat</span>
          )}
        </div>
        <div className="chatonline">
          <div className="onlinewrapper">
            <Chatonline
              onlineusers={onlineusers}
              currentId={user._id}
              setCurretChat={setCurretChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};
