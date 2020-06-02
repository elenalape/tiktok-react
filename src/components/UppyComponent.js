import React from "react";
import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react";
import Webcam from "@uppy/webcam";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

class UppyComponent extends React.Component {
	componentWillUnmount() {
		this.uppy.close();
	}

	render() {
		const { handleUploadCompleted } = this.props;

		this.uppy = Uppy({
			meta: { type: "video" },
			autoProceed: true,
		});

		this.uppy.use(Webcam); // `id` defaults to "Webcam"
		this.uppy.use(Webcam, { id: "MyWebcam" }); // `id` is… "MyWebcam"

		this.uppy.use(Transloadit, {
			params: {
				auth: {
					key: process.env.REACT_APP_TRANSLOADIT_API,
				},
				steps: {
					video_resized: {
						use: ":original", //pipes in files uploaded from uppy
						robot: "/video/encode", //specifies which Robot we will use
						result: true,
						ffmpeg_stack: "v3.3.3",
						resize_strategy: "fillcrop", //Sets a resize strategy which will crop to the exact dimensions specified. We have other options available
						height: 410,
						preset: "ipad-high", //Presets bring a number of values over to your assembly without needing to specify them such as bit rate
						width: 220,
					},
					"encode-grayscale": {
						use: "video_resized",
						robot: "/video/encode",
						result: true,
						ffmpeg_stack: "v3.3.3",
						preset: "empty",
						ffmpeg: {
							//FFMpeg allows for custom features and specifications to be applied. It is what we use behind the scenes for many of our bots
							vf: "hue=s=0", //Converts video to grayscale
						},
					},
					invert_watermarked: {
						use: "encode-grayscale", //pipes over our resize step which we named above
						robot: "/video/encode",
						result: true,
						ffmpeg_stack: "v3.3.3",
						preset: "empty", //No need to bring over a preset as we are just piping over our past step.
						watermark_size: "50%", //Size of the watermark
						watermark_opacity: 0.7, //Value which specifes how transparent a value is
						watermark_position: "top-right",
						watermark_url:
							"https://i.pinimg.com/originals/79/1b/54/791b5416c8ac2265c13070d1cc5914bf.png",
					},
					imported_audio: {
						robot: "/http/import",
						result: false,
						url:
							"https://demos.transloadit.com/inputs/joakim_karud-rock_angel.mp3",
					},
					merged: {
						robot: "/video/merge",
						use: {
							steps: [
								{
									name: "imported_audio",
									as: "audio",
								},
								{
									name: "invert_watermarked",
									as: "video_resized",
								},
							],
							bundle_steps: true,
						},
						result: true,
						framerate: "1/3",
						ffmpeg_stack: "v3.3.3",
						preset: "ipad-high",
					},
				},
			},
			waitForEncoding: true,
		});

		this.uppy.on("transloadit:result", (stepName, result) => {
			console.log("Result:", result);
			const id = result.id;
			const url = result.url;
			handleUploadCompleted(id, url);
		});

		this.uppy.run();

		return (
			<div>
				<Dashboard plugins={["Webcam"]} uppy={this.uppy} />
			</div>
		);
	}
}

export default UppyComponent;
