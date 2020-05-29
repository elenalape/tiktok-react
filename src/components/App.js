import React from "react";
import VideosList from "./VideosList";
import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div className="ui container">
				<div className="tiktok-title">TikTok</div>
				<h3>
					Upload a video and it'll appear under Newest videos shortly.
				</h3>
				<p>Zero content moderation is a feature, not a bug.</p>
				<div>
					<VideosList />
				</div>
			</div>
		);
	}
}

export default App;
