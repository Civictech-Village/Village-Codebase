import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
import { formDataPostOptions } from "../utils";
const baseUrl = '/api/issues/';

export const createIssue = async (value, id) => {
  console.log(`api/issues/${id}`);
  fetchHandler(baseUrl + id, getPostOptions(value));
};

export const getAllUsers = async () => {
};

// export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateUsername = async ({ id, username }) => (
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
// );
