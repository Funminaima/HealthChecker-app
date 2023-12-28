interface Props {
  currentQuestion: number;
  questionlength: number;
}
const ProgressBar = ({ currentQuestion, questionlength }: Props) => {
  return (
    <div>
      {/* <div className="progress"></div> */}
      <progress
        max={questionlength}
        value={currentQuestion + 1}
        className="progress"
        style={{ backgroundColor: "red" }}
      ></progress>
    </div>
  );
};

export default ProgressBar;
