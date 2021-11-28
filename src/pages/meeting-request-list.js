import React from "react";
import MeetingRequestList from "../components/MeetingRequestsList";
import PageTitle from "../components/PageTitle";
import { requireAuth } from "./../util/auth.js";

function MeetingRequestListPage(props) {
  return (
    <>
      <PageTitle title="Solicitudes Pendientes" />
      <MeetingRequestList />
    </>
  );
}

export default requireAuth(MeetingRequestListPage);
