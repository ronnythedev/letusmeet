import React from "react";
import MeetingJoin from "../components/MeetingJoin";
import { useParams } from "react-router-dom";
import { requireAuth } from "./../util/auth.js";

function MeetingJoinPage() {
  const { roomId } = useParams();
  return <MeetingJoin roomId={roomId} />;
}

export default requireAuth(MeetingJoinPage);
