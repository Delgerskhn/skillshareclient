import { GetUser } from "./user-store";


export const WrapResult = (ok, data, message) => {
    return {
        Ok: ok,
        Data: data,
        Message: message
    }
}

const Fetch = async (path, method, body, secure = false) => {
    var headers = new Headers();
    if (secure) headers.append("Authorization", `Bearer ${GetUser()?.auth_token}`);
    if (method.toUpperCase() != "GET") headers.append("Content-Type", "application/json");

    var options = {
        method: method,
        redirect: 'follow',
        headers: headers
    };
    if (body) options.body = JSON.stringify(body);
    var req = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${path}`, options)
    var res = await req.text();
    try {
        var temp = JSON.parse(res);
        res = temp;
    } catch (err) {
    }
    console.log(req, res)
    if (!req.ok) throw res
    return res
}

export default Fetch