import React from "react";
import UpcomingMeetingList from "../components/UpcomingMeetingList";
import PageTitle from "../components/PageTitle";
import { requireAuth } from "./../util/auth.js";

const UpcomingMeetingsListPage = () => {
  return (
    <>
      <PageTitle title="Próximas Reuniones" />
      <UpcomingMeetingList />
    </>
  );
};

export default requireAuth(UpcomingMeetingsListPage);
