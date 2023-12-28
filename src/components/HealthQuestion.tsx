import { Answer } from "../type.d";
import Button from "./Button";

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
}

const HealthQuestion = ({
  questions,
  currentQuestion,
  handleAnswer,
  selectedOption,
  questionLength,
  handleNext,
}: Props) => {
  return (
    <>
      <section className="card-body">
        <h1>{questions[currentQuestion].question_text}</h1>
        <div className="btn-container">
          {questions[currentQuestion].answers?.map((answer, idx) => {
            return (
              <button
                key={answer.id}
                className={`btn1 ${selectedOption === idx ? "active" : ""}`}
                id={answer.id}
                type="button"
                onClick={() => handleAnswer(idx, answer)}
                data-testid="option-button"
              >
                {answer.label}
                {selectedOption === idx && (
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
      </section>
      <footer>
        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`btn ${selectedOption !== null ? "" : "disable"}`}
          type="button"
          data-testid="next-button"
        >
          {currentQuestion === questionLength - 1 ? "Finish" : "Next"}
          {/* Next */}
          <img src="/assets/right.svg" alt="right logo" className="icon3" />
        </Button>
      </footer>
    </>
  );
};

export default HealthQuestion;
