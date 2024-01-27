import React from "react";
import Question from "../question";
import "./style.css";
import Button from "../button";

const QuizQuestions = ({
  questions,
  answers,
  onChoseQuestion,
  isShowBtnSubmit,
  onSubmit,
  isShowAnswer,
}) => {
  return (
    <div className="quiz-question-box">
      {questions.map((question) => {
        return (
          <Question
            selectedAnswer={question.selectedAnswer}
            key={question.question}
            {...question}
            isShowAnswer={isShowAnswer}
            onChangeAnswer={(selectedAnswer) => {
              onChoseQuestion({
                question: question.question,
                selectedAnswer,
              });
            }}
          />
        );
      })}
      {isShowBtnSubmit && <Button onClick={onSubmit}>Submit</Button>}
    </div>
  );
};

export default QuizQuestions;
