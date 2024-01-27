import { useContext, useEffect } from "react";
import QuizMaker from "../../components/quiz-maker";
import QuizQuestions from "../../components/quiz-questions";
import { AppContext } from "../../contexts/app-context";
import {
  actionQuizMakerChangeSelected,
  actionQuizMakerChangeSubmitStatus,
  actionQuizMakerFail,
  actionQuizMakerRequest,
  actionQuizMakerReset,
  actionQuizMakerSuccess,
} from "../../reducer/quiz-maker/actions"
import { opentdbApi } from "../../shared/services/opentdb-api";
import {
  actionQuizQuestionCalculateResults,
  actionQuizQuestionChoseAnswer,
  actionQuizQuestionFail,
  actionQuizQuestionRequest,
  actionQuizQuestionReset,
  actionQuizQuestionSuccess,
} from "../../reducer/quiz-question/actions";
import { useNavigate } from "react-router-dom";

const isValidOptions = (value) => {
  for (var key in value) {
    if (!value[key]) return false;
  }
  return true;
};

const Home = () => {
  const { dispatchQuizMaker, dispatchQuizQuestions, quizMaker, quizQuestions } =
    useContext(AppContext);
  const navigate = useNavigate();

  const {
    triviaCategories,
    isLoading,
    isSubmit,
    selected: quizMakerSelected,
  } = quizMaker;

  const { isShowBtnSubmit, isSubmit: isSubmitQuestions } = quizQuestions;

  useEffect(() => {
    dispatchQuizMaker(actionQuizMakerReset());
    dispatchQuizQuestions(actionQuizQuestionReset());
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    navigate("/result");
  };

  const handleChoseQuestion = (answer) => {
    dispatchQuizQuestions(actionQuizQuestionChoseAnswer(answer));
  };

  const handleQuizMakerChangeSelected = (value) => {
    dispatchQuizMaker(actionQuizMakerChangeSelected(value));
  };

  return (
    <div>
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
            onSubmit={handleSubmitQuizQuestion}
            isShowBtnSubmit={isShowBtnSubmit && !isSubmitQuestions}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
