import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../Data/Data';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [look, setLook] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);    

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let Option5 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4, Option5];

//   for question and answere
  const checkAns = (e, ans) => {
    if (question.ans === ans) {
      e.target.classList.add("correct");
      setLook(true);
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("wrong");
      setLook(true);
      option_array[question.ans - 1].current.classList.add("correct");
    }
  };

//   for next button 
  const next = () => {
    if (look === true) {
        if (index === data.length-1)
        {
            setResult(true);
            return 0;
        }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLook(false);
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove('wrong');
          option.current.classList.remove('correct');
        }
      });
    }
  };

//   for reset button 
const reste = ()=> {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLook(false);
    setResult(false);
}

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr></hr>
      {result? <></>: <>
      <h2>{index + 1}, {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
        <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
        <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
        <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
        <li ref={Option5} onClick={(e) => { checkAns(e, 5) }}>{question.option5}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className='index'>{index+1} to {data.length} Questions</div>
      </>}

      {result? <>
        <h2>Your Scored {score} out of {data.length}</h2>
      <button onClick={reste}>Reset</button>
      </>: <></>}
     
    </div>
  );
};

export default Quiz;
