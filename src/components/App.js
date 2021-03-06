import React from "react";
import VideosList from "./VideosList";
import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div className="ui container">
				<div className="ui two column grid">
					<div className="row">
						<div className="eleven wide column">
							<div style={{
						display: "flex",
						width: "200px",
						paddingBottom: "30px",
						paddingTop: "50px",
					}}>
								<img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1280px-TikTok_logo.svg.png" />
							</div>
						</div>
						<div className="one wide column button-position">
							<i className="cloud upload icon large" style={{paddingTop: "10px"}}></i>
						</div>
						<div className="three wide column" style={{paddingTop: "65px"}}>
							<button className="ui button large pink">
								Log in
							</button>
						</div>
					</div>
				</div>
				<hr />
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
