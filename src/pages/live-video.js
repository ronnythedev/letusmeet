import React from "react";
import LiveVideoComponent from "../components/live-video";
import { useParams } from "react-router-dom";
import { requireAuth } from "./../util/auth.js";

const LiveVideo = () => {
  const { roomId } = useParams();
  return <LiveVideoComponent roomId={roomId} />;
};

export default requireAuth(LiveVideo);
