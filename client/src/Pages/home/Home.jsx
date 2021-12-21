import Topbar from "../../components/Topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import RightPart from "../../components/rightpart/RightPart"
import Feed from "../../components/feed/Feed"
import "./home.css"
export default function Home() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
            <Sidebar />
            <Feed />
            <RightPart />
            </div>
        </>
    )
}
