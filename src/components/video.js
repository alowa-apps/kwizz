import React from "react"
const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className="video">
    <iframe
      src={videoSrcURL + "?autoplay=1&autohide=1&showinfo=0&controls=0"}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      title="youtubemovie"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      autoPlay
    />
  </div>
)
export default Video
