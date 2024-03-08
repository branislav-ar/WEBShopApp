import { loginFailure, loginStart, loginSuccess, logoutAtemptStart, logoutAtemptSuccess, logoutFailed } from "./userRedux";
import { emptyAll } from "./cartRedux";
import { publicRequest } from "../requestMethods";


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));
    }
    catch(err) {
        dispatch(loginFailure());
    }
}

export const logout = async (dispatch) => {
    dispatch(logoutAtemptStart());
    try {
        dispatch(logoutAtemptSuccess());
    }
    catch(err) {
        dispatch(logoutFailed());
    }
}

export const emptyCart = async (dispatch) => {
    try {
        dispatch(emptyAll());
    }
    catch {
        console.log("Greska pri praznjenju korpe!");
    }
}