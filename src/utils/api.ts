import axios from "axios";
export const login = async (username: string, password: string) => {
    const { data } = await axios.post("/api/login",{
        name: username,
        password
    });
    return data?.data || {}
}