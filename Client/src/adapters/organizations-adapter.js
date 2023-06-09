import { fetchHandler, formDataPostOptions } from "../utils";

const baseUrl = '/api/villages';

export const createVillage = async (formData) => (
  fetchHandler(baseUrl, formDataPostOptions(formData))
);
// Do Not try anyother methods yet
// eating errors here for simplicity
export const getAllVillages = async () => {
  const [villages] = await fetchHandler(baseUrl);
  return villages || [];
};

export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateUsername = async ({ id, username }) => (
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
// );
