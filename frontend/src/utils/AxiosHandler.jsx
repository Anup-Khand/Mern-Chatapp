import axios from "axios";

const baseURL = import.meta.env.VITE_PORT;

export const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (request) => {
      try {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        if (user && user.token) {
          request.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Error retrieving token from local storage", error);
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

// export default ApiClient();
