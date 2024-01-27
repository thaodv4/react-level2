import React from "react";
import { shuffleArray } from "../../shared/utils/shuffle-array";
import Button from "../button";

const Question = ({ question, correct_answer, incorrect_answers }) => {
  let answers = [];
  if (correct_answer && incorrect_answers) {
    answers = shuffleArray([correct_answer, ...incorrect_answers]);
  }
  return (
    <div className="question-box">
      <p className="question"></p>
      <div>
        {answers.map((item) => (
          <Button key={item}>{item}</Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
