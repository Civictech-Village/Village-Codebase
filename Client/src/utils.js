const basicFetchOptions = {
  method: 'GET',
  credentials: 'include',
};

export const deleteOptions = {
  method: 'DELETE',
  credentials: 'include',
};

export const getPostOptions = (body) => ({
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const formDataPostOptions = (formData) => ({
  method: 'POST',
  credentials: 'include',
  body: formData,
});
export const formDataPatchOptions = (formData) => ({
  method: 'PATCH',
  credentials: 'include',
  body: formData,
});


export const getPatchOptions = (body) => ({
  method: 'PATCH',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const serializeFormData = (form) => {
  const obj = {};
  const formData = new FormData(form);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
};
export const fetchHandler = async (url, options = basicFetchOptions) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return [null, { status: res.status, statusText: res.statusText }];
    if (res.status === 204) return [true, null];

    const data = await res.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const fetchImageHandler = async (url, options = basicFetchOptions) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return [null, { status: res.status, statusText: res.statusText }];
    if (res.status === 204) return [true, null];
    const text = await res.text();
    return [text, null];
  } catch (error) {
    return [null, error];
  }
};
