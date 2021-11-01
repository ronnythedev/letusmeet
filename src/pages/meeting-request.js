import React from "react";
import MeetingRequest from "../components/MeetingRequest.js";
import { requireAuth } from "./../util/auth.js";

function MeetingRequestPage(props) {
  return <MeetingRequest props={props} />;
}

export default requireAuth(MeetingRequestPage);
