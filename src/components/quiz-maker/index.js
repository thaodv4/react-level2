import React from "react";
import Select from "../select";
import { Difficulty } from "../../shared/constants/Difficulty";
import Button from "../button";

const QuizMaker = ({
  triviaCategories,
  onSubmit,
  disabled,
  onChangeSelected,
  selected,
}) => {
  const handleChange = (name) => (event) => {
    onChangeSelected({ [name]: event.target.value });
  };

  return (
    <div>
      <Select
        onChange={handleChange("category")}
        name="category"
        id="categorySelect"
        options={triviaCategories}
        value={selected?.category}
        defaultOptions={{ name: "Select a category", id: "" }}
        disabled={disabled}
      />
      <Select
        onChange={handleChange("difficulty")}
        name="difficulty"
        options={Difficulty}
        value={selected?.difficulty}
        id="difficultySelect"
        defaultOptions={{ name: "Select a difficulty", id: "" }}
        disabled={disabled}
      />
      <Button id="createBtn" onClick={onSubmit} disabled={disabled}>
        Create
      </Button>
    </div>
  );
};

export default QuizMaker;
