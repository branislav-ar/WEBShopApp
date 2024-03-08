import { publicRequest, userRequest } from "../requsetMethods";
import { getProductStart, getProductSuccess, getProductFailure,
         deleteProductStart, deleteProductSuccess, deleteProductFailure,
         updateProductStart, updateProductSuccess, updateProductFailure,
         addProductStart, addProductSuccess, addProductFailure } from "./productRedux";
import { loginStart, loginSuccess, loginFailure,
         getUsersStart, getUsersSuccess, getUsersFailure,
         addUserStart, addUserSuccess, addUserFailure,
         updateUserStart, updateUserSuccess, updateUserFailure,
         deleteUserStart, deleteUserSuccess, deleteUserFailure } from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }
    catch(err) {
        dispatch(loginFailure());
    }
};

//PRODUCTS
//GET
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    }
    catch(err) {
        dispatch(getProductFailure());
    }
};
//ADD
export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post("/products", product);
        dispatch(addProductSuccess(res.data));
    }
    catch(err) {
        dispatch(addProductFailure());
    }
};
//UPDATE
export const updateProducts = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess({ id, product }));
    }
    catch(err) {
        dispatch(updateProductFailure());
    }
};
//DELETE
export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    }
    catch(err) {
        dispatch(deleteProductFailure());
    }
};

//USERS
//GET
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await userRequest.get("users/");
        dispatch(getUsersSuccess(res.data));
    }
    catch(err) {
        dispatch(getUsersFailure());
    }
};
//ADD
export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post("/auth/register", user);
        dispatch(addUserSuccess(res.data));
    }
    catch(err) {
        dispatch(addUserFailure());
    }
};
//DELETE
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    }
    catch(err) {
        dispatch(deleteUserFailure());
    }
};
//UPDATE
export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({ id, user }));
    }
    catch(err) {
        dispatch(updateUserFailure());
    }
};