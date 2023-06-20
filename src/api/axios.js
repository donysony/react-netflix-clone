import axios from "axios";

const instance = axios.create({
    baseURL:"http://api.themoviedb.org/3",
    params:{
        api_key : "eb5b9e19e0b9e5964d38f21c9807d69d",
        language:"ko-KR",
    }
});
export default instance;