import React from "react";

const VideoItem = (props) => {
	return (
		<div className="ui card">
			<div className="content">
				<div className="right floated meta">just now</div>
				<img
					class="ui avatar image"
					src="https://www.shareicon.net/data/256x256/2016/09/05/825143_user_512x512.png"
				/>
				Name
			</div>
			<div className="image">
				<video
					controls="controls"
					name="Video Name"
					src={props.url}
					type="video/mp4"
					width="100%"
					video="100%"
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
					<input type="text" placeholder="Add Comment..." />
				</div>
			</div>
		</div>
	);
};

export default VideoItem;
