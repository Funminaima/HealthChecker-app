import { useState, useEffect } from "react";
import jsonData from "../constant/constant";
import { Answer } from "../type.d";
import HeartBurnChecker from "../components/HeartBurnChecker";

const HeartBurnPage = () => {
  const Constants = jsonData;
  const { outcomes, questions } = Constants;
  const questionLength = Constants.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState(
    Array(questions.length).fill(null)
  );
  const [userScores, setUserScores] = useState(Array(questions.length).fill(0));
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [outcome, setOutcome] = useState("");
  const [currentAns, setCurrentAns] = useState<Answer | null>(null);
  const [nextQuestion, setNextQuestion] = useState("");
  useEffect(() => {
    if (nextQuestion !== "") {
      getCurrentQuestion();
    }
  }, [nextQuestion]);

  const getCurrentQuestion = () => {
    const currentId = Constants.questions.findIndex(
      (question) => question.id === nextQuestion
    );
    setCurrentQuestion(currentId);
    setSelectedOption(userResponses[currentId] || null);
  };

  const handleAnswer = (answerIndex: number, ans: Answer) => {
    const question = questions[currentQuestion];
    const newResponses = [...userResponses];
    const newScores = [...userScores];

    if (newResponses[currentQuestion] !== null) {
      newScores[currentQuestion] -=
        question.answers[newResponses[currentQuestion]].score;
    }

    newResponses[currentQuestion] = answerIndex;
    newScores[currentQuestion] += question.answers[answerIndex].score;

    // Updating the total score
    const newTotalScore = newScores.reduce((acc, score) => acc + score, 0);
    setTotalScore(newTotalScore);

    setUserResponses(newResponses);
    setUserScores(newScores);

    setSelectedOption(answerIndex);
    setCurrentAns(ans);
  };

  const handlePrevious = () => {
    // Find the index of the previous non-null response
    const previousIndex = findPreviousNonNullOriginal(currentQuestion);
    console.log(previousIndex, "previous index");

    if (previousIndex !== null) {
      setCurrentQuestion(previousIndex);
      setSelectedOption(userResponses[previousIndex]);
    } else {
      alert("This is the first question or there is no non-null response");
    }
  };

  const findPreviousNonNullOriginal = (currentIndex: number): number | null => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (userResponses[i] !== null) {
        return i;
      }
    }
    return null;
  };

  const handleNext = () => {
    const nextIndex = findNextNonNullOriginal(currentQuestion);

    if (currentQuestion < questions.length - 1) {
      const currentQuestionData = questions[currentQuestion];
      currentQuestionData.next.map((nxt) => {
        if ("answered" in nxt) {
          if (nxt.answered === currentAns?.id) {
            setNextQuestion(nxt.next_question);
          }
        } else if ("next_question" in nxt) {
          setNextQuestion(nxt.next_question);
        } else {
          return;
        }
      });
      if (nextIndex !== null) {
        setCurrentQuestion(nextIndex);
        setSelectedOption(userResponses[nextIndex] || null);
      }
    } else {
      displayOutcome();
      setShowResult(true);
    }
  };

  // Helper function to find the index of the next non-null response on handleNext
  const findNextNonNullOriginal = (currentIndex: number): number | null => {
    for (let i = currentIndex + 1; i < userResponses.length; i++) {
      if (userResponses[i] !== null) {
        return i;
      }
    }
    return null;
  };
  const handleClickBackHome = () => {
    setCurrentQuestion(0);
    setUserResponses(Array(questions.length).fill(null));
    setUserScores(Array(questions.length).fill(0));
    setShowResult(false);
    setSelectedOption(null);
    setTotalScore(0);
    setOutcome("");
    setCurrentAns(null);
    setNextQuestion("");
  };
  console.log(totalScore, "totalscore");

  const displayOutcome = () => {
    // Calculating total score and determine the outcome
    const totalScore = userScores.reduce((acc, score) => acc + score, 0);

    let outcome: string;
    for (const outcomeData of questions[questions.length - 1].next as Array<{
      answered?: string;
      next_question?: string;
      max_score?: number;
      outcome: string;
    }>) {
      if (outcomeData.max_score && totalScore <= outcomeData.max_score) {
        outcome = outcomeData.outcome;
        break;
      } else if (!outcomeData.max_score) {
        outcome = outcomeData.outcome;
        break;
      }
    }

    // storing the outcome
    const selectedOutcome = outcomes.find((o) => o.id === outcome);
    if (selectedOutcome !== undefined) {
      console.log(`Outcome: ${selectedOutcome.text}`);
      setOutcome(selectedOutcome?.text);
    }
  };
  return (
    <>
      <HeartBurnChecker
        questions={questions}
        currentQuestion={currentQuestion}
        handleAnswer={handleAnswer}
        selectedOption={selectedOption}
        questionLength={questionLength}
        handleNext={handleNext}
        showResult={showResult}
        handlePrevious={handlePrevious}
        handleClickBackHome={handleClickBackHome}
        outcome={outcome}
      />
    </>
  );
};

export default HeartBurnPage;
