import axios, { isCancel, AxiosError } from "axios";
const API_HOST_ENDPOINT = "http://localhost:8080";
const USER_SIGN_UP = "/usersignup";
const USER_SIGN_IN = "/usersignin";
const APPLICATION_CREATE = "/application-create";
const APPLICATION_FETCH = "/applications";
const APPLICATION_FETCH_OFFICER = "/search-applications";
const APPLICATION_STATUS = "/status-application";
const EVALUATE_APPLICATION = "/evaluate-application"

export const userSignUpService = (obj: any, cb: any) => {
  axios({
    method: "post",
    url: API_HOST_ENDPOINT + USER_SIGN_UP,
    data: obj,
  })
    .then((res: any) => {
      cb(res);
    })
    .catch(function (err:any) {
      console.log("Fetch Error :-S", err);
    });
};

export const userSignInService = (obj: any, cb: any) => {
  axios({
    method: "post",
    url: API_HOST_ENDPOINT + USER_SIGN_IN,
    data: obj,
  })
    .then((res: any) => {
      cb(res);
    })
    .catch(function (err:any) {
      cb(err);
    });
};

export const applicationCreateService = (obj: any, cb: any) => {
  axios({
    method: "post",
    url: API_HOST_ENDPOINT + APPLICATION_CREATE,
    data: obj,
  })
    .then((res: any) => {
      cb(res);
    })
    .catch(function (err:any) {
      cb(err);
    });
};

export const applicationGetService = (obj: any, cb: any) => {
  axios({
    method: "post",
    url: API_HOST_ENDPOINT + APPLICATION_FETCH,
    data: obj,
  })
    .then((res: any) => {
      cb(res);
    })
    .catch(function (err:any) {
      cb(err);
    });
};

export const getApplicationOfficerService = (obj: any, cb: any) => {
  axios({
    method: "post",
    url: API_HOST_ENDPOINT + APPLICATION_FETCH_OFFICER,
    data: obj,
  })
    .then((res: any) => {
      cb(res);
    })
    .catch(function (err:any) {
      cb(err);
    });
};

export const setApplicationStatusService = (obj: any, cb: any) => {
  axios({
    method: "post",
    url: API_HOST_ENDPOINT + APPLICATION_STATUS,
    data: obj,
  })
    .then((res: any) => {
      cb(res);
    })
    .catch(function (err:any) {
      cb(err);
    });
};

export const evaluateApplicationService = (obj: any, cb: any) => {
  axios({
    method: "post",
    url: API_HOST_ENDPOINT + EVALUATE_APPLICATION,
    data: obj,
  })
    .then((res: any) => {
      cb(res);
    })
    .catch(function (err:any) {
      cb(err);
    });
};

