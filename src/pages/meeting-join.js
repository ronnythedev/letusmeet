import React from "react";
import MeetingJoin from "../components/MeetingJoin";
import { useParams } from "react-router-dom";

function MeetingJoinPage() {
  const { roomId } = useParams();
  return <MeetingJoin roomId={roomId} />;
}

export default MeetingJoinPage;
