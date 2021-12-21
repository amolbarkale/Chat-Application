import "./online.css"
export default function Online({ users}) {
    return (
        <li className="rightbarfriend">
                        <div className="rigthbarProfileImgContainer">
                <img className="rigthbarProfileimg" src={ users.profilePicture} alt="" />
                        <span className="rightbaronline"></span>
                        </div>
            <span className="rightbarUserName">{ users.username}</span>
                    </li>
    )
}
