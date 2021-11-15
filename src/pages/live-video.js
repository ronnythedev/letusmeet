import React from "react";
import LiveVideoComponent from "../components/live-video";
import { useParams } from "react-router-dom";

const LiveVideo = () => {
  const { roomId } = useParams();
  return <LiveVideoComponent roomId={roomId} />;
};

export default LiveVideo;
