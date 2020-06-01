import React from "react";

const VideoItem = (props) => {
	return (
		<div className="ui card">
			<div className="content">
				<div className="right floated meta">just now</div>
				<img class="ui avatar image" />
				Name
				<div className="video">
					<video
						controls="controls"
						name="Video Name"
						src={props.url}
						type="video/mp4"
					></video>
				</div>
				<div className="content">
					<div className="right floated" />
					<i className="heart outline like icon"></i>
					17 likes
					<i className="comment icon"></i>3 comments
				</div>
				<div className="extra content">
					<div className="ui large transparent left icon input">
						<i className="heart outline icon"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoItem;
