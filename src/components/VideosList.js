import React from "react";
import UppyComponent from "./UppyComponent";

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
          <table>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td>
                    <video
                      controls="controls"
                      width="400"
                      height="200"
                      name="Video Name"
                      src={video.url}
                      type="video/mp4"
                    ></video>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ImagesList;
