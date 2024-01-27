import React, { useState } from "react";
import Select from "../select";
import { Difficulty } from "../../shared/constants/Difficulty";
import Button from "../button";

const QuizMaker = ({ triviaCategories, onSubmit, disabled }) => {
  const [state, setState] = useState({ category: "", difficulty: "" });

  const onChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const isValidOptions = () => {
    for (var key in state) {
      if (!state[key]) return false;
    }
    return true;
  };

  const onClick = (event) => {
    if (isValidOptions()) {
      onSubmit(state, event);
    }
  };

  return (
    <div>
      <Select
        onChange={onChange("category")}
        name="category"
        id="categorySelect"
        options={triviaCategories}
        value={state.category}
        defaultOptions={{ name: "Select a category", id: "" }}
        disabled={disabled}
      />
      <Select
        onChange={onChange("difficulty")}
        name="difficulty"
        options={Difficulty}
        value={state.difficulty}
        id="difficultySelect"
        defaultOptions={{ name: "Select a difficulty", id: "" }}
        disabled={disabled}
      />
      <Button id="createBtn" onClick={onClick} disabled={disabled}>
        Create
      </Button>
    </div>
  );
};

export default QuizMaker;
