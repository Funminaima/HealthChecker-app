import { useState, useEffect } from "react";
import jsonData from "../constant/constant";
import { NextStep, Answer } from "../type.d";

const Heartburn = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [nextQuestion, setNextQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [outcome, setOutcome] = useState("");
  const [answer, setAnswer] = useState<Answer>();
  const [showResult, setShowResult] = useState(false);
  const [prevQuestion, setPrevQuestion] = useState(null);

  const Constants = jsonData;
  //  const {questions, }=Constant;
  const { question_text, answers, next } = Constants.questions[currentQuestion];

  // const current = Constants.questions.find((question)=>{

  // })
  useEffect(() => {
    if (nextQuestion !== "") {
      getCurrentQuestion();
    }
  }, [nextQuestion]);

  // useEffect(() => {
  //   setNewAnswer(
  //     answers.map((ans: Answer) => ({
  //       ...ans,
  //       isSelected: false,
  //     }))
  //   );
  // }, [answers]);

  const getCurrentQuestion = () => {
    const currentId = Constants.questions.findIndex(
      (question) => question.id === nextQuestion
    );
    setCurrentQuestion(currentId);
  };

  const onClickBtn = (ans: Answer) => {
    setCurrentAnswer(ans.id);
    setActive(true);
    setAnswer(ans);
  };

  const onClickNext = () => {
    setScore((prev) => prev + answer?.score);

    if (currentQuestion === Constants.questions.length - 1) {
      const result = next.find(
        (nxt: NextStep) => nxt.max_score !== undefined && score <= nxt.max_score
      );
      if (result) {
        setOutcome(result.outcome);
      } else {
        setOutcome(next[next.length - 1].outcome);
      }
      setShowResult(true);
      setCurrentQuestion(0);
    } else {
      next.map((nxt: NextStep) => {
        if (Object.prototype.hasOwnProperty.call(nxt, "answered")) {
          if (nxt.answered === currentAnswer) {
            setNextQuestion(nxt.next_question);
          }
        } else {
          setNextQuestion(nxt.next_question);
        }
      });
    }

    setActive(false);
  };

  const displayOutcome = () => {
    const InitialScore = score;
    const scoreTotal = newAns?.reduce((total, ans) => {
      if (ans.isSelected) {
        return total + ans.score;
      } else {
        return total;
      }
    }, 0);
    setScore(InitialScore + scoreTotal);
  };
  // console.log(nextQuestion, "NEXT QUESTION");
  console.log(currentQuestion, "currentquestion");
  console.log(score, "score");
  // console.log(outcome, "outcome");

  return (
    <div className="container">
      <div className="card">
        {score}
        {!showResult ? (
          <>
            <h3>
              <img src="/assets/left.svg" alt="backLogo" className="icon" />
              Heartburn checker
            </h3>
            <div className="card-body">
              <h1>{question_text}</h1>
              <div className="btn-container">
                {answers?.map((answer) => {
                  return (
                    <button
                      key={answer.id}
                      className={`btn1 ${
                        answer.id === currentAnswer ? "active" : ""
                      }`}
                      id={answer.id}
                      type="button"
                      onClick={() => onClickBtn(answer)}
                    >
                      {answer.label}
                      {answer.id === currentAnswer && (
                        <img
                          src="/assets/outline.svg"
                          alt="success"
                          className="icon2"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <footer>
              <button
                className={`btn ${active ? "" : "disable"}`}
                type="button"
                onClick={onClickNext}
                disabled={active ? false : true}
              >
                {currentQuestion === Constants.questions.length - 1
                  ? "Finish"
                  : "Next"}
                {/* Next */}
                <img
                  src="/assets/right.svg"
                  alt="right logo"
                  className="icon3"
                />
              </button>
            </footer>
          </>
        ) : (
          <div>here is your outcome: {outcome}</div>
        )}
      </div>
    </div>
  );
};

export default Heartburn;
