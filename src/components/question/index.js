import React from "react";
import Button from "../button";
import "./style.css";

const Question = ({
  question,
  answers,
  disabled,
  onChangeAnswer,
  selectedAnswer,
  isShowAnswer,
  correct_answer,
}) => {
  return (
    <div className="question-box">
      <p
        className="question"
        dangerouslySetInnerHTML={{ __html: question }}
      ></p>
      <div className="answer">
        {answers.map((item) => (
          <Button
            disabled={disabled || isShowAnswer}
            key={item}
            danger={
              item === selectedAnswer &&
              selectedAnswer !== correct_answer &&
              isShowAnswer
            }
            active={
              selectedAnswer === item ||
              (isShowAnswer && item === correct_answer)
            }
            onClick={() => {
              onChangeAnswer(item);
            }}
          >
            <p dangerouslySetInnerHTML={{ __html: item }} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
