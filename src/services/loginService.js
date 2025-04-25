import api from "./api";

export const sendLoginRequest = (LoginRequest) => {
  return api.post('/login', LoginRequest);
};