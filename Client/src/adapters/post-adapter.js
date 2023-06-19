import { fetchHandler, getPostOptions, getPatchOptions, formDataPostOptions } from "../utils";

const baseUrl = '/api/posts/';

export const createPost = async (formData, issue_id, village_id) => {
  formData.append("issue_id", issue_id);
  fetchHandler(baseUrl + village_id, formDataPostOptions(formData));
};

// eating errors here for simplicity
export const getAllUsers = async () => {

};

// export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateUsername = async ({ id, username }) => (
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
// );
