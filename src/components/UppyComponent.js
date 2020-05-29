import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react";
import "./UppyComponent.css";

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

		// TODO: so how do we send this to Transloadit?
		this.uppy.use(Tus, { endpoint: "https://master.tus.io/files/" });

		this.uppy.on("complete", (result) => {
			console.log("Completed upload, result:", result);
			const id = result.successful[0].id;
			const url = result.successful[0].uploadURL;
			handleUploadCompleted(id, url);
		});

		this.uppy.run();

		return (
			<div>
				{/*<Dashboard/>*/}
				<Dashboard uppy={this.uppy} />
			</div>
		);
	}
}

export default UppyComponent;
