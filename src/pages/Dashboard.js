import Card from "../components/Card";
import "../styles/Dashboard.css";
import ArticlePost from "../components/ArticlePost";
import YoutubePost from "../components/YoutubePost";
import VideoPost from "../components/VideoPost";
import SongPost from "../components/SongPost";
import InstagramPost from "../components/InstagramPost";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Card
        image="https://images.unsplash.com/photo-1615147342761-9238e15d8b96?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
        tagColor="tag-blue"
        tagName="Design"
        date="2021-03-30"
        title="Duis autem vel eum iriure dolor in hend in vulputate"
        userImage="https://i.pravatar.cc/40?img=2"
        userName="John Doe"
        postTime="2h ago"
      />
      <ArticlePost />
      <YoutubePost />
      <VideoPost />
      <SongPost />
      <InstagramPost />
    </div>
  );
}

export default Dashboard;
