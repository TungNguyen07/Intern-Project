import axios from "axios";

export const fetchData = url => {
  const options = {
    url: url,
    method: "get"
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};
