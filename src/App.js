import "./App.css";
import { useEffect, useReducer } from "react";
import QuizMaker from "./components/quiz-maker";
import { quizMakerStore } from "./store/quiz-maker/reducers";

import { opentdbApi } from "./shared/services/opentdb-api";
import {
  actionQuizMakerFail,
  actionQuizMakerRequest,
  actionQuizMakerSuccess,
} from "./store/quiz-maker/actions";
import { quizQuestionStore } from "./store/quiz-question/reducers";
import {
  actionQuizQuestionFail,
  actionQuizQuestionRequest,
  actionQuizQuestionSuccess,
} from "./store/quiz-question/actions";
import QuizQuestions from "./components/quiz-questions";

const { initial: initialQuizMaker, reducer: quizMakerReducer } = quizMakerStore;
const { initial: initialQuestions, reducer: quizQuestionReducer } =
  quizQuestionStore;

function App() {
  const [quizMaker, dispatchQuizMaker] = useReducer(
    quizMakerReducer,
    initialQuizMaker
  );

  const [quizQuestions, dispatchQuizQuestions] = useReducer(
    quizQuestionReducer,
    initialQuestions
  );

  const { triviaCategories, isLoading } = quizMaker;

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
    try {
      dispatchQuizQuestions(actionQuizQuestionRequest());
      const response = await opentdbApi.get(
        `api.php?amount=5&category=${value.category}&difficulty=${value.difficulty}&type=multiple`
      );
      const data = await response.json();
      dispatchQuizQuestions(
        actionQuizQuestionSuccess(
          data && data.results ? data.results : []
        )
      );
    } catch {
      dispatchQuizQuestions(actionQuizQuestionFail());
    }
  };
  console.log(quizQuestions)

  return (
    <div className="App">
      <h1 className="title">QUIZ MAKER</h1>
      <QuizMaker
        triviaCategories={triviaCategories}
        disabled={isLoading}
        onSubmit={handleCreateQuiz}
      />
      <QuizQuestions/>
    </div>
  );
}

export default App;
