import React from "react";
import MyAvailableDates from "./../components/MyAvailableDates";
import { requireAuth } from "./../util/auth.js";

function DashboardPage(props) {
  return (
    <MyAvailableDates
      bgColor="default"
      size="medium"
      bgImage=""
      bgImageOpacity={1}
      title="Mis Fechas Disponibles"
      subtitle=""
    />
  );
}

export default requireAuth(DashboardPage);
