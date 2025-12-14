import API from "./axiosInstance";

// Create Place
export const createPlace = (data) => API.post("/create", data);

// Get all places
export const getAllPlaces = () => API.get("/");

// Get one place
export const getPlaceById = (id) => API.get(`/${id}`);

// Update place
export const updatePlace = (id, data) => API.put(`/update/${id}`, data);

// Delete place
export const deletePlace = (id) => API.delete(`/delete/${id}`);
