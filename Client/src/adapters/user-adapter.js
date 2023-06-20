import { fetchHandler, getPostOptions, getPatchOptions, formDataPostOptions } from "../utils";

const baseUrl = '/api/users';

export const createUser = async ({ username, password, email, gender }, birthday) => (
  fetchHandler(baseUrl, getPostOptions({ username, password, email, gender, birthday }))
);

// eating errors here for simplicity
export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};

export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateUsername = async ({ id, username }) => (
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
);

export const updateUser = async (id, formData) => (
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions(formData))
);
