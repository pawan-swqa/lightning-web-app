import axios from "axios";

const getLightningDataService = () => {
  const url = `http://localhost:3000/features`;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Erorr in axios req", error);
      return;
    });
};

export { getLightningDataService };
