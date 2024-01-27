import React, { useMemo } from "react";
import { shuffleArray } from "../../shared/utils/shuffle-array";
import Button from "../button";
import "./style.css";

const Question = ({
  question,
  correct_answer,
  incorrect_answers,
  disabled,
  onChangeAnswer,
  selectedAnswer,
  isShowAnswer,
}) => {
  let answers = useMemo(() => {
    if (correct_answer && incorrect_answers) {
      return shuffleArray([correct_answer, ...incorrect_answers]);
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
