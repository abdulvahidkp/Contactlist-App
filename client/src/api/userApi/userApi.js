import axios from "../axios";
import { api } from "../userUrl/userUrl";

export const signup = async (datas) => {
    try {
        const { data } = await axios.post(api.signup,datas);
        return
    } catch (error) {
        console.log(error);
    }
}