import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../../contexts/app-context";
import QuizQuestions from "../../components/quiz-questions";
import { QuizAnswers } from "../../components/quiz-answers";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "../../shared/constants/PathConstants";

const Result = () => {
  const navigate = useNavigate();

  const { quizQuestions, quizMaker } = useContext(AppContext);

  const {
    numberOfCorrectAnswer,
    totalAnswer,
    isCompletedCalculate,
  } = quizQuestions;

  const { isSubmit: isSubmitQuizMaker } = quizMaker;
  useEffect(() => {
    if (!isSubmitQuizMaker) {
      handleNewQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitQuizMaker]);

  const handleNewQuiz = useCallback(() => {
    navigate(PathConstants.Home, {
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isCompletedCalculate) {
    return "Calculating...";
  }

  return (
    <>
      <h1 className="title">QUIZ RESULT</h1>
      {quizQuestions.questions.length ? (
        <div className="quiz-questions-container">
          <QuizQuestions
            questions={quizQuestions.questions}
            isShowAnswer
            isShowBtnSubmit={false}
          />
        </div>
      ) : (
        ""
      )}
      <div className="quiz-answers-container">
        <QuizAnswers
          correct={numberOfCorrectAnswer}
          total={totalAnswer}
        />
      </div>
      <div className="create-new-quiz-container">
        <Button onClick={handleNewQuiz}>Create A New Quiz</Button>
      </div>
    </>
  );
};

export default Result;
