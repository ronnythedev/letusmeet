import { apiRequest } from "../util/util";

export const getAvailableDates = async () => {
  let response = await apiRequest("user/available-dates", "GET")
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.availableDates;
};

export const saveUniqueUrl = async (link) => {
  let response = await apiRequest("user/updatelink", "PATCH", {
    newLink: link,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const updateAvailableDates = async (newDates) => {
  let response = await apiRequest("user/update-dates", "PATCH", {
    newDates: newDates,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const getUserInfoByLinkId = async (linkId, fromDate) => {
  let response = await apiRequest(`user/link/${linkId}/${fromDate}`)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response;
};

export const insertMeetingRequest = async (
  userToId,
  startDateTs,
  fromTime,
  toTime,
  subject,
  optionalNotes
) => {
  let response = await apiRequest(`user/insert-meeting-request`, "POST", {
    userToId: userToId,
    startDateTs: startDateTs,
    fromTime: fromTime,
    toTime: toTime,
    subject: subject,
    optionalNotes: optionalNotes,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const getUpcomingMeetings = async () => {
  let response = await apiRequest("user/upcoming-meetings", "GET")
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const getUpcomingPendingMeetings = async () => {
  let response = await apiRequest("user/upcoming-pending-meetings", "GET")
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const validateMeetingRoomPin = async (roomId, enteredRoomPin) => {
  let response = await apiRequest(
    `user/validate-room-pin/${roomId}/${enteredRoomPin}`,
    "GET"
  )
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const confirmMeeting = async (meetingId) => {
  let response = await apiRequest("user/confirm-meeting", "PATCH", {
    meetingId: meetingId,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const declineMeeting = async (meetingId) => {
  let response = await apiRequest("user/decline-meeting", "PATCH", {
    meetingId: meetingId,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const cancelMeeting = async (meetingId) => {
  let response = await apiRequest("user/cancel-meeting", "PATCH", {
    meetingId: meetingId,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};

export const resendConfirmationEmail = async () => {
  let response = await apiRequest("user/resend-confirmation-email", "POST")
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};
