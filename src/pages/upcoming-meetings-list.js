import React from "react";
import UpcomingMeetingList from "../components/UpcomingMeetingList";
import PageTitle from "../components/PageTitle";

const UpcomingMeetingsListPage = () => {
  return (
    <>
      <PageTitle title="Próximas Reuniones" />
      <UpcomingMeetingList />
    </>
  );
};

export default UpcomingMeetingsListPage;
