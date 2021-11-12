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
