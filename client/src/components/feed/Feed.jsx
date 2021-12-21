import "./feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const base = "http://localhost:5656/api/";
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`${base}posts/profile/` + username)
        : await axios.get(`${base}posts/timeline/` + user._id);
      setPosts(res.data);
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedwrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
