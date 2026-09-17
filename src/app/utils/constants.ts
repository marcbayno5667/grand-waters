export const API_ENDPOINT = "https://grand-waters-backend.vercel.app";
// export const API_ENDPOINT = "http://localhost:3000";

export const API_HEADER = {
  Authorization: `Bearer ${localStorage.getItem("gw_access_token")}`,
};
