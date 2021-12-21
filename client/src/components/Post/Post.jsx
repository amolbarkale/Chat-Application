import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext"
import { format } from "timeago.js";
import { Link } from "react-router-dom";
export default function Post({ post }) {

    const [like, setLike] = useState(post.likes.length);
     const [islike, setisLike] = useState(false);
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const base = "http://localhost:5656/api/"
   
   
    useEffect(() => {
        setisLike(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])
   
   
    useEffect(() => {
        const fetchUser = async() => {
         const res = await axios.get(`${base}users?userId=${post.userId}`)
                setUser(res.data)   
        }
        fetchUser();
     },[post.userId, like])
    
    
    const handleLike = () => {

 try {
        axios.put(`http://localhost:5656/api/posts/${post._id}/like`, {
            userId: currentUser._id });
    } catch (err) { console.log('err:', err)}

        setLike(islike ? like - 1 : like + 1)
        setisLike(!islike)
    }
    ///profile/:username
    return (
        <div className="Post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="posttopleft">
                        <Link to={`profile/${user.username}`}>
                        <img className="postprofileImg" src= { user.profilePicture || "/logo192.png"} alt="" />
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </Link></div>
                    <div className="posttopRight">
                     <MoreVert/>
            </div>
            </div>
                <div className="postCenter">
                    <span className="posttext">
                        {post?.desc }</span>
                    <img className="postImg" src={post.img || "/post3.jpg"} alt="" />
            </div>
                <div className="postBottom">
                    <div className="postbtmleft">
                        <img className="likeIcon"  src="/thumb.jpg" alt="" onClick={handleLike} />
                        <img className="likeIcon"  src="heartt.png" alt="" onClick={handleLike} />
                        <span className="PostlikeCounter">{like} like it</span>
                    </div>
                    <div className="postbtnright">
                        <span className="postcommentText">{post.comment} comments</span>
                </div>

            </div>
            </div>
        </div>
    )
}
