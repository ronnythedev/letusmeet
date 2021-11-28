import React from "react";
import EmailConfirm from "../components/EmailConfirm";
import { useParams } from "react-router-dom";

function EmailConfirmPage() {
  const { token } = useParams();
  return <EmailConfirm token={token} />;
}

export default EmailConfirmPage;
