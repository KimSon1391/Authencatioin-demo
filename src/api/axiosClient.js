const { default: axios } = require('axios');

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  header: {
    'Content-type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log('Error Response:', error);
    const { config, status, data } = error;
    const URLs = ['/auth/local/register', '/auth/local'];
    if (URLs.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};

      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
