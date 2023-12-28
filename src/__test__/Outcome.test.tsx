import { render, screen, fireEvent } from "@testing-library/react";
import Outcome from "../components/Outcome";
import "@testing-library/jest-dom";

const outcomeText = "Your outcome text";
const handleClickBackHome = jest.fn();
test("renders Outcome component when showResult is true", () => {
  render(
    <Outcome outcome={outcomeText} handleClickBackHome={handleClickBackHome} />
  );

  const outcomeHeader = screen.getByText(
    "Thank you for answering the question"
  );
  expect(outcomeHeader).toBeInTheDocument();
  const outcomeTextElement = screen.getByText(outcomeText);
  expect(outcomeTextElement).toBeInTheDocument();
});

test("calls handleClickBackHome when 'Back to start Screen' link is clicked", () => {
  render(
    <Outcome outcome={outcomeText} handleClickBackHome={handleClickBackHome} />
  );

  const backLink = screen.getByText("Back to start Screen");
  fireEvent.click(backLink);
  expect(handleClickBackHome).toHaveBeenCalled();
});
