import { toast } from "react-toastify";
import axios from "axios";

const axiosConfig = async (method, url, data) => {
    try {
        return await axios({ method, url, data })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    } catch (error) {
        console.log(error);
        toast.error("something went wrong in the axios");
    }
};

export default axiosConfig;