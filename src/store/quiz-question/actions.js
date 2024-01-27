export const QUIZ_QUESTION_REQUEST = "QUIZ_QUESTION_REQUEST";
export const QUIZ_QUESTION_SUCCESS = "QUIZ_QUESTION_SUCCESS";
export const QUIZ_QUESTION_FAIL = "QUIZ_QUESTION_FAIL";
export const QUIZ_QUESTION_CHANGE_SUBMIT_STATUS =
  "QUIZ_QUESTION_CHANGE_SUBMIT_STATUS";

export const actionQuizQuestionRequest = () => ({
  type: QUIZ_QUESTION_REQUEST,
});

export const actionQuizQuestionSuccess = (payload) => ({
  type: QUIZ_QUESTION_SUCCESS,
  payload,
});

export const actionQuizQuestionFail = () => ({
  type: QUIZ_QUESTION_FAIL,
});

export const actionQuizQuestionChangeSubmitStatus = (payload) => ({
  type: QUIZ_QUESTION_CHANGE_SUBMIT_STATUS,
  payload,
});
