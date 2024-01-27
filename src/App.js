import "./App.css";
import { useReducer } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Result from "./pages/result";
import { AppContext } from "./contexts/app-context";
import { quizQuestion } from "./reducer/quiz-question/reducers";
import { quizMaker } from "./reducer/quiz-maker/reducers";
import { PathConstants } from "./shared/constants/PathConstants";

const { initial: initialQuizMaker, reducer: quizMakerReducer } = quizMaker;
const { initial: initialQuestions, reducer: quizQuestionReducer } =
  quizQuestion;

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
          <Route path={PathConstants.Home} element={<Home />} />
          <Route path={PathConstants.Result} element={<Result />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
