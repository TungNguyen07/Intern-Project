import axios from "axios";

export const postData = (url, data) => {
  const options = {
    url: url,
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: data
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};
