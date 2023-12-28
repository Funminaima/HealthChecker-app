import ProgressBar from "./ProgressBar";
import { Answer } from "../type.d";
import Outcome from "./Outcome";
import HealthQuestion from "./HealthQuestion";

interface Props {
  questions: {
    question_text: string;
    answers: Answer[];
  }[];
  currentQuestion: number;
  handleAnswer: (answerIndex: number, ans: Answer) => void;
  selectedOption: number | null;
  questionLength: number;
  handleNext: () => void;
  handleClickBackHome: () => void;
  handlePrevious: () => void;
  showResult: boolean;
  outcome: string;
}

const HeartBurnChecker = ({
  questions,
  currentQuestion,
  handleAnswer,
  selectedOption,
  questionLength,
  handleNext,
  handleClickBackHome,
  handlePrevious,
  showResult,
  outcome,
}: Props) => {
  return (
    <div className="container">
      <div className="card">
        <header>
          <h3>
            {showResult ? (
              ""
            ) : (
              <img
                src="/assets/left.svg"
                alt="backLogo"
                className="icon"
                onClick={handlePrevious}
                data-testid="back-button"
              />
            )}
            Heartburn checker
          </h3>
          <ProgressBar
            currentQuestion={currentQuestion}
            questionlength={questionLength}
          />
        </header>
        {!showResult ? (
          <>
            <HealthQuestion
              questions={questions}
              currentQuestion={currentQuestion}
              handleAnswer={handleAnswer}
              selectedOption={selectedOption}
              questionLength={questionLength}
              handleNext={handleNext}
            />
          </>
        ) : (
          <>
            <Outcome
              outcome={outcome}
              handleClickBackHome={handleClickBackHome}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HeartBurnChecker;
