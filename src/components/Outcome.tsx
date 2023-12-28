import Button from "./Button";

interface Props {
  outcome: string;
  handleClickBackHome: () => void;
}

const Outcome = ({ outcome, handleClickBackHome }: Props) => {
  return (
    <>
      <div className="outcome-text">
        <h2 data-testd="outcome-text">Thank you for answering the question</h2>
        <p data-testid="outcome">{outcome}</p>
        <Button className="btn" type="button">
          {" "}
          Book a meeting
          {/* Next */}
          <img
            src="/assets/right.svg"
            alt="right logo"
            className="icon3"
            style={{ left: "30%", position: "relative" }}
          />
        </Button>
      </div>

      <div className="link">
        <a href="#" onClick={handleClickBackHome}>
          Back to start Screen
        </a>
      </div>
    </>
  );
};

export default Outcome;
