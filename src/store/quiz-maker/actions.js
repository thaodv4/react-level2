export const QUIZ_MAKER_REQUEST = "QUIZ_MAKER_REQUEST";
export const QUIZ_MAKER_SUCCESS = "QUIZ_MAKER_SUCCESS";
export const QUIZ_MAKER_FAIL = "QUIZ_MAKER_FAIL";
export const QUIZ_MAKER_CHANG_SELECTED = "QUIZ_MAKER_CHANG_SELECTED";
export const QUIZ_MAKER_CHANGE_SUBMIT_STATUS =
  "QUIZ_MAKER_CHANGE_SUBMIT_STATUS";
export const QUIZ_MAKER_RESET = "QUIZ_MAKER_RESET";

export const actionQuizMakerRequest = () => ({
  type: QUIZ_MAKER_REQUEST,
});

export const actionQuizMakerSuccess = (payload) => ({
  type: QUIZ_MAKER_SUCCESS,
  payload,
});

export const actionQuizMakerFail = () => ({
  type: QUIZ_MAKER_FAIL,
});

export const actionQuizMakerChangeSubmitStatus = (payload) => ({
  type: QUIZ_MAKER_CHANGE_SUBMIT_STATUS,
  payload,
});

export const actionQuizMakerReset = () => ({
  type: QUIZ_MAKER_RESET,
});

export const actionQuizMakerChangeSelected = (payload) => ({
  type: QUIZ_MAKER_CHANG_SELECTED,
  payload,
});
