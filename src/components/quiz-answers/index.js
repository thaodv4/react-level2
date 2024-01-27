import "./style.css";
import { getTypeByCorrectAnswer } from "./modules/getTypeByCorrectAnswer";

export const QuizAnswers = ({ correct, total }) => {
  return (
    <div
      className={`quiz-answers-summary bg-${getTypeByCorrectAnswer(correct)}`}
    >
      You scored {correct} out of {total}
    </div>
  );
};
