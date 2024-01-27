import "./App.css";
import { useEffect, useReducer } from "react";
import QuizMaker from "./components/quiz-maker";
import { quizMakerStore } from "./store/quiz-maker/reducers";

import { opentdbApi } from "./shared/services/opentdb-api";
import {
  actionQuizMakerChangeSelected,
  actionQuizMakerChangeSubmitStatus,
  actionQuizMakerFail,
  actionQuizMakerRequest,
  actionQuizMakerReset,
  actionQuizMakerSuccess,
} from "./store/quiz-maker/actions";
import { quizQuestionStore } from "./store/quiz-question/reducers";
import {
  actionQuizQuestionCalculateResults,
  actionQuizQuestionChoseAnswer,
  actionQuizQuestionFail,
  actionQuizQuestionRequest,
  actionQuizQuestionReset,
  actionQuizQuestionSuccess,
} from "./store/quiz-question/actions";
import QuizQuestions from "./components/quiz-questions";
import { QuizAnswers } from "./components/quiz-answers";
import Button from "./components/button";

const { initial: initialQuizMaker, reducer: quizMakerReducer } = quizMakerStore;
const { initial: initialQuestions, reducer: quizQuestionReducer } =
  quizQuestionStore;

const isValidOptions = (value) => {
  for (var key in value) {
    if (!value[key]) return false;
  }
  return true;
};

function App() {
  const [quizMaker, dispatchQuizMaker] = useReducer(
    quizMakerReducer,
    initialQuizMaker
  );

  const [quizQuestions, dispatchQuizQuestions] = useReducer(
    quizQuestionReducer,
    initialQuestions
  );

  const {
    triviaCategories,
    isLoading,
    isSubmit,
    selected: quizMakerSelected,
  } = quizMaker;

  const {
    isShowBtnSubmit,
    isSubmit: isSubmitQuestions,
    numberOfCorrectAnswer,
    numberOfIncorrectAnswer,
  } = quizQuestions;

  useEffect(() => {
    (async () => {
      try {
        dispatchQuizMaker(actionQuizMakerRequest());

        const response = await opentdbApi.get("api_category.php");
        const result = await response.json();

        dispatchQuizMaker(
          actionQuizMakerSuccess(
            result && result.trivia_categories ? result.trivia_categories : []
          )
        );
      } catch (err) {
        dispatchQuizMaker(actionQuizMakerFail());
      }
    })();
  }, []);

  const handleCreateQuiz = async (value) => {
    if (!isValidOptions(value)) return;
    try {
      dispatchQuizMaker(actionQuizMakerChangeSubmitStatus(true));
      dispatchQuizQuestions(actionQuizQuestionRequest());
      const response = await opentdbApi.get(
        `api.php?amount=5&category=${value.category}&difficulty=${value.difficulty}&type=multiple`
      );
      const data = await response.json();
      dispatchQuizQuestions(
        actionQuizQuestionSuccess(data && data.results ? data.results : [])
      );
    } catch {
      dispatchQuizMaker(actionQuizMakerChangeSubmitStatus(false));
      dispatchQuizQuestions(actionQuizQuestionFail());
    }
  };

  const handleSubmitQuizQuestion = async () => {
    dispatchQuizQuestions(actionQuizQuestionCalculateResults());
  };

  const handleNewQuiz = () => {
    dispatchQuizMaker(actionQuizMakerReset());
    dispatchQuizQuestions(actionQuizQuestionReset());
  };

  const handleChoseQuestion = (answer) => {
    dispatchQuizQuestions(actionQuizQuestionChoseAnswer(answer));
  };

  const handleQuizMakerChangeSelected = (value) => {
    dispatchQuizMaker(actionQuizMakerChangeSelected(value));
  };

  return (
    <div className="App">
      <h1 className="title">QUIZ MAKER</h1>
      <div className="quiz-maker-container">
        <QuizMaker
          onChangeSelected={handleQuizMakerChangeSelected}
          triviaCategories={triviaCategories}
          selected={quizMakerSelected}
          disabled={isLoading || isSubmit}
          onSubmit={() => handleCreateQuiz(quizMakerSelected)}
        />
      </div>
      {quizQuestions.questions.length ? (
        <div className="quiz-questions-container">
          <QuizQuestions
            questions={quizQuestions.questions}
            onChoseQuestion={handleChoseQuestion}
            isShowAnswer={isSubmitQuestions}
            onSubmit={handleSubmitQuizQuestion}
            isShowBtnSubmit={isShowBtnSubmit && !isSubmitQuestions}
          />
        </div>
      ) : (
        ""
      )}
      {isSubmitQuestions && (
        <div className="quiz-answers-container">
          <QuizAnswers
            correct={numberOfCorrectAnswer}
            total={numberOfCorrectAnswer + numberOfIncorrectAnswer}
          />
        </div>
      )}
      {isSubmitQuestions && (
        <div className="create-new-quiz-container">
          <Button onClick={handleNewQuiz}>Create New Quiz</Button>
        </div>
      )}
    </div>
  );
}

export default App;
