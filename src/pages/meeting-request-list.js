import React from "react";
import MeetingRequestList from "../components/MeetingRequestsList";
import PageTitle from "../components/PageTitle";

function MeetingRequestListPage(props) {
  return (
    <>
      <PageTitle title="Solicitudes Pendientes" />
      <MeetingRequestList />
    </>
  );
}

export default MeetingRequestListPage;
