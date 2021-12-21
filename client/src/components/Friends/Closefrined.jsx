import "./closefriend.css"
export default function Closefrined({ user}) {
    return (
        <li className="sidebarfriend"> <img src={ user.profilePicture} alt="" className="sidebarfriendimg" />
            <span className="sidebarrfiendname">{ user.username}</span>
       </li>
    )
}
