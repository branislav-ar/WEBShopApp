import axios from 'axios';

const BASE_URL = "http://localhost:5000/shop/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDUzMzhiODE0NmEwN2Q2NzQzZjdjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTA0MDEzNSwiZXhwIjoxNjQ1Mjk5MzM1fQ.w4gW70g8wz4yGgOc764S3EeraCmthOgx208TD6_zL58 */

/* console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken);
 */


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`},
});

