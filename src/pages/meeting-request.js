import React from "react";
import MeetingRequest from "../components/MeetingRequest.js";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import { requireAuth } from "./../util/auth.js";

function MeetingRequestPage() {
  const { selectedTimeTs, hourKey, userId, userName, userLastName, userEmail } =
    useParams();
  return (
    <>
      <PageTitle title="Solicitud de Reunión" />
      <MeetingRequest
        selectedTimeTs={selectedTimeTs}
        hourKey={hourKey}
        userId={userId}
        userName={userName}
        userLastName={userLastName}
        userEmail={userEmail}
      />
    </>
  );
}

export default requireAuth(MeetingRequestPage);
