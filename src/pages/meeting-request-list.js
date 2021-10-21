import React from "react";
import PublicAvailableDates from "../components/PublicAvailableDates";

function MeetingRequestListPage(props) {
  return (
    <PublicAvailableDates
      bgColor="default"
      size="medium"
      bgImage=""
      bgImageOpacity={1}
      title="Solicitudes de Reunión"
      subtitle=""
    />
  );
}

export default MeetingRequestListPage;
