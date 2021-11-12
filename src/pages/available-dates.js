import React from "react";
import PublicAvailableDates from "./../components/PublicAvailableDates";
import { useParams } from "react-router-dom";

const AvailableDatesPage = () => {
  const { userurl } = useParams();
  return (
    <PublicAvailableDates
      bgColor="default"
      size="medium"
      bgImage=""
      bgImageOpacity={1}
      title=""
      subtitle=""
      userUrl={userurl}
    />
  );
};

export default AvailableDatesPage;
