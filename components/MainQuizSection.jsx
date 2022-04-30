import React, { useState, useContext, useEffect, useRef} from 'react'
import { UserContext } from '../context/usercontext';
import { useRouter } from 'next/router'
import ScoreCard from './ScoreCard';
import Sidebar from './Sidebar';
import MainQuestion from './QuestionContainer';
import QuestionContainer from './QuestionContainer';
import LoggedInfo from '../components/loggedIn';
import Modal from './Modal';


const QuizSection = () => {
  const {username, setUsername} = useContext(UserContext);
  const [page, setPage] = useState(1)
  const [questions, setQuestions] = useState([])
  const [currQuesIndex, setCurrQuesIndex] = useState(0)
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({
    right:0,
    wrong:0,
    total:0
  });
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);




  useEffect(() => {
    async function getQuestions(){
      
      try{
          const response = await fetch(`/api/questions?page=${page}`);
          const result = await response.json()
          console.log(response);
          if(!response.ok){
            throw new Error("Soem error occured")
          }
          console.log(result)
          setQuestions(result)
        }catch(err){
          alert(err)
        }
      
    }
    getQuestions()
  }, [page]);

  useEffect(() => {
    async function gettotalQuiz(){
      
      try{
          const response = await fetch(`/api/totalQuiz?count=${5}`);
          const result = await response.json()
          console.log(response);
          if(!response.ok){
            throw new Error("Soem error occured")
          }
          console.log(result)
          setTotalPages(result[0]['COUNT(id)'] / 5)
        }catch(err){
          alert(err)
        }
      
    }
    gettotalQuiz()
  }, []);

  const nextPage = (currPage) => {
    setIsOpen(false)

    if(page === currPage) return ;
    setPage(currPage);
    //On page change reset all these variables
    resetStateVariables();

  }
  
  const onNext = () => {
    if(currQuesIndex == 4) return
    setCurrQuesIndex(currQuesIndex + 1);
  }
  const onPrev = () => {
    if(currQuesIndex == 0)return
    setCurrQuesIndex(currQuesIndex - 1)
  }
  const optionClick = (quesId,selectedId) =>{
    const ansObj = {quesId: quesId, ans: selectedId};
    // Finding if this question is already ansered
    const answer = answers.find((answer) => answer.quesId === quesId );
    if(!answer){
      setAnswers([...answers, ansObj]);
    }
    else{
      setAnswers(answers.map((answer) => {
        if(answer.quesId == quesId){
          return ansObj
        }
        return answer
      }))
    }
  }
  const onSubmit = () => {
    const wrong = 0;
    const right = 0;
    const total = 0;
    if(answers.length !== questions.length){
      alert("Please answer all the questions");
      return 
    }
    questions.forEach((question, index) => {
      const answer = answers.find((answer) => answer.quesId === question.id );
      if(answer){
        if(answer.ans == question.correct_option ){
          right++;
        }
        else{
          wrong++;
        }
      }
      total++;
    })
      setScore({right, wrong, total});
      setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false);
    resetStateVariables();
  }

  const resetStateVariables = ( ) => {
    setAnswers([]);
    setCurrQuesIndex(0);
    setScore({
      right:0,
      wrong:0,
      total:0
    });
  }


  return (
    <>
    { questions.length > 0 ?
    <div className=' flex flex-col md:flex-row gap-5 w-full h-full' >
    <Sidebar totalPages = {totalPages} currPage = {page} setPage = {nextPage} />
    <QuestionContainer
     {...questions[currQuesIndex]} 
     onNext = {onNext} 
     index = {currQuesIndex} 
     onPrev = {onPrev}
     onOptionClick = {optionClick}
     onSubmit  = {onSubmit}
     /> 
    { isOpen && <Modal >
       <h1 className=' my-1 font-bold text-xl text-pink-500 ' >Your Score</h1>
       <div className="score text-center">
          <h1 className='text-green-800 text-2xl ' >{(score.right / score.total) *100}% </h1>
          <p className=' text-sm text-pink-300 mt-1' >{score.right} out of {score.total} answered correctly</p>
       </div>
       <div className='flex gap-5 justify-between py-2 w-full ' >
        <button className="close py-1 px-3 text-teal-400 border-2 border-teal-400 rounded-sm text-sm " onClick={onClose} >Close</button>
        <button className={`next py-1 px-3  text-white rounded-sm text-sm ${page == 2? "cursor-not-allowed bg-teal-500/50 ": "bg-teal-700"} `} onClick = {() => { 
          nextPage(2);
        }
        } >
         Next Quiz
        </button>
       </div>
       
     </Modal> }
  </div>
    :
    <LoggedInfo>
      <div>
        <h1>Loading Quiz Questions For You....</h1>
      </div>
    </LoggedInfo>
    }
    
  </>
  )
}

export default QuizSection