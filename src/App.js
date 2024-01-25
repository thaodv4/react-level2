import Button from './components/button';
import './App.css';
import Select from './components/select';
import { useEffect, useState } from 'react';
import { Difficulty } from './shared/constants/Difficulty';
function App() {
  const [triviaCategories, setTriviaCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const result = await response.json();
        setTriviaCategories(
          result && result.trivia_categories ? result.trivia_categories : []
        );
      } catch {
        setTriviaCategories([]);
      }
    })();
  }, []);
  console.log(triviaCategories);

  return (
    <div className='App'>
      <h1 className='title'>QUIZ MAKER</h1>
      <div>
        <Select
          options={triviaCategories}
          defaultOptions={{ name: 'Select a category' }}
        />
        <Select
          options={Difficulty}
          defaultOptions={{ name: 'Select a difficulty' }}
        />
        <Button id='createBtn'>Create</Button>
      </div>
      <Button danger disabled>
        Hihi
      </Button>
    </div>
  );
}

export default App;
