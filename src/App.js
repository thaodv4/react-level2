import "./App.css";
import { useReducer } from "react";


import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Result from "./pages/result";
import { AppContext } from "./contexts/app-context";
import { quizQuestion } from "./reducer/quiz-question/reducers";
import { quizMaker } from "./reducer/quiz-maker/reducers";

const { initial: initialQuizMaker, reducer: quizMakerReducer } = quizMaker;
const { initial: initialQuestions, reducer: quizQuestionReducer } =quizQuestion
;

function App() {
  const [quizMaker, dispatchQuizMaker] = useReducer(
    quizMakerReducer,
    initialQuizMaker
  );

  const [quizQuestions, dispatchQuizQuestions] = useReducer(
    quizQuestionReducer,
    initialQuestions
  );

  return (
    <AppContext.Provider
      value={{
        quizMaker,
        quizQuestions,
        dispatchQuizMaker,
        dispatchQuizQuestions,
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/result" index element={<Result />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
