import React from "react";
import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react";
import { DashboardModal } from "@uppy/react";
import Webcam from "@uppy/webcam";
import "./UppyComponent.css";
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
					key: "d2d40be680154979a823b83262368b98",
				},
				steps: {
					":original": {
						robot: "/upload/handle",
					},
					video_resized: {
						use: ":original",
						robot: "/video/encode",
						result: false,
						ffmpeg_stack: "v3.3.3",
						resize_strategy: "fit",
						height: 100,
						preset: "ipad-high",
						width: 150,
					},
					invert_watermarked: {
						use: "video_resized",
						robot: "/video/encode",
						result: true,
						ffmpeg_stack: "v3.3.3",
						height: 100,
						resize_strategy: "fillcrop",
						preset: "ipad-high",
						watermark_position: "top-left",
						watermark_size: "100%",
						watermark_url:
							"https://demos.transloadit.com/inputs/waterframe.png",
						width: 150,
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
