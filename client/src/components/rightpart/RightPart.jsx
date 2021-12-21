import "./rightpart.css";
import { Users } from "../../../src/dummyData";
import Online from "../Online/Online";
export default function RightPart({ user}) {
  
    const HomeRightbar = () => {
        return <> <div className="birthdayContainer">
            <img className="birthdayImg" src="/post5.jpg" alt="" />
            <span className="bdayText"><b>Foster</b> and <b>3 others</b> have a bday today</span>
        </div>
                
            <img className="rightbarAd" src="/post5.jpg" alt="" />
            <h4 className="title">Online friends</h4>
            <ul className="rightbarfriendlist">
                {Users.map(u => (
                    <Online key={u.id} users={u} />
                ))}
            </ul></>
    };

    const ProfileRightbar = () => {
        return (<>
        <h4 className="rightbarTitle">useinfo title</h4>
            <div className="rightBarInfo">
                <div className="rightbarinfoItm">
                    <span className="rightbarinfokey">City:</span>
                    <span className="rightbarinfokeyValue">{ user.city}</span>
                </div>
                <div className="rightbarinfoItm">
                    <span className="rightbarinfokey">From:</span>
                     <span className="rightbarinfokeyValue">{ user.from}</span>
                </div>
                <div className="rightbarinfoItm">
                    <span className="rightbarinfokey">Relationship:</span>
                     <span className="rightbarinfokeyValue">{ user.relationship === 1? "Single" : user.relationship === 2 ? "Married": "" }</span>
                </div>
            </div>
            <h4 className="rightbartitle1">User friends</h4>
            <div className="rightbarFollowins">
                <div className="rightbarFollowing">
                <img src="/trial.png" alt="" className="rightbarfollowingImg" />
               <span className="rightbarfollowingName">Johny lever</span>
                </div>
                <div className="rightbarFollowing">
                <img src="/trial.png" alt="" className="rightbarfollowingImg" />
               <span className="rightbarfollowingName">Johny lever</span>
                </div>
                <div className="rightbarFollowing">
                <img src="/trial.png" alt="" className="rightbarfollowingImg" />
               <span className="rightbarfollowingName">Johny lever</span>
                </div>
                <div className="rightbarFollowing">
                <img src="/trial.png" alt="" className="rightbarfollowingImg" />
               <span className="rightbarfollowingName">Johny lever</span>
                </div>
                <div className="rightbarFollowing">
                <img src="/trial.png" alt="" className="rightbarfollowingImg" />
               <span className="rightbarfollowingName">Johny lever</span>
                </div>
                
            </div></>)
    }
  
  
    return (
            <div className="rightBar">
                <div className="rigtbarwrapper">
                {user? <ProfileRightbar/> : <HomeRightbar/> }
            </div>
       </div>
    )
}
