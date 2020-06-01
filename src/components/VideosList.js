import React from "react";
import UppyComponent from "./UppyComponent";
import VideoItem from "./VideoItem";

class ImagesList extends React.Component {
  state = { videos: [] };

  handleUploadCompleted = (id, url) => {
    let videos = this.state.videos;
    videos.push({ id, url });
    this.setState({ videos });
  };

  render() {
    const { videos } = this.state;

    return (
      <React.Fragment>
        <div className="ui grid">
          <div className="ui row">
            <UppyComponent handleUploadCompleted={this.handleUploadCompleted} />
          </div>
          <div className="ui row">
            <h2>Newest Videos</h2>
          </div>
          {videos.map((video) => (
            <div key={video.id}>
              <div className="ui row">
                <VideoItem url={video.url} />
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ImagesList;
