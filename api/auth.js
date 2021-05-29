import Fetch, { WrapResult } from "../helpers/fetch";
import { GetUser, SaveUser } from "../helpers/user-store";

export async function signIn(email, password) {
    try {
        // Send request
        var body = {
            email: email,
            password: password
        }
        var res = await Fetch('/auth/login', 'post', body, true);
        SaveUser(res)
        console.log(res)
        return {
            isOk: true,
            data: res
        };
    }
    catch (ex) {
        console.log(ex)
        return {
            isOk: false,
            message: (ex?.login_failure?.length && ex?.login_failure[0]) || "Authentication failed"
        };
    }
}

export async function createAccount(user) {
    try {
        // Send request
        console.log(email, password);
        var res = await Fetch('/accounts', 'post', user);
        return WrapResult(true, res)
    }
    catch(ex) {
        return WrapResult(false,null,ex?.DuplicateUserName? ex.DuplicateUserName[0]:"Failed to create account")
    }
}

export async function changePassword(email, recoveryCode) {
    try {
        // Send request
        console.log(email, recoveryCode);

        return {
            isOk: true
        };
    }
    catch {
        return {
            isOk: false,
            message: "Failed to change password"
        }
    }
}

export async function resetPassword(email) {
    try {
        // Send request
        console.log(email);

        return {
            isOk: true
        };
    }
    catch {
        return {
            isOk: false,
            message: "Failed to reset password"
        };
    }
}
