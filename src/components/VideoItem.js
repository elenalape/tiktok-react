import React from "react";

const VideoItem = (props) => {
	return (
		<div>
			<video
				controls="controls"
				name="Video Name"
				src={props.url}
				type="video/mp4"
			></video>
		</div>
	);
};

export default VideoItem;
