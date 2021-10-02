import React from "react";
import DashboardSection2 from "./../components/DashboardSection2";
import { requireAuth } from "./../util/auth.js";

function MeetingRequestPage(props) {
  return (
    <DashboardSection2
      bgColor="default"
      size="medium"
      bgImage=""
      bgImageOpacity={1}
      title="Solicitar Reunión"
      subtitle=""
    />
  );
}

export default requireAuth(MeetingRequestPage);
