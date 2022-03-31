import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
export const getLoginState = () => {
    const user = window.localStorage.getItem("_user");
    const token = window.localStorage.getItem("_token");
    if (user && token) {
        const {exp} = jwt_decode(token) as any;
        return !dayjs(exp*1000).isBefore(dayjs());
    }
    return false;
}
export const logout = () => {
    window.localStorage.removeItem("_user");
    window.localStorage.removeItem("_token");
}