import "./share.css";
import {PermMedia,Label,Room, EmojiEmotions } from "@material-ui/icons"
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";
export default function Share() {

    const { user } = useContext(AuthContext);
    const descc = useRef();
   
    const [file, setFile] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: descc.current.value,
        };
        try {
            await axios.post("http://localhost:5656/api/posts", newPost);
        } catch (err) {
            console.log('err:', err)

         }
    }

    return (
        <div className="share">
            <div className="sharewrapper">
            <div className="shareTop">
                    <img className="shareProfileImg" src={ user.profilePicture ? user.profilePicture: "/logo192.png"} alt="" />
                    <input ref={ descc} placeholder={`whats in ur mind ${user.username}?`} className="shareInput" /> </div>
                <hr className="shareHr" />
                <form className="sharebottom" onSubmit={ handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo/video</span>
                            <input style={{display: "none"} }type="file" id="file" accept=".png,.jpeg,.jpg" onChange={ e=> setFile(e.target.files[0])}/>
                        </label>
                         <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                         <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Locations</span>
                        </div>
                         <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
<button className="sharebtn" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
