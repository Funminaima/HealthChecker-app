import { render, screen, fireEvent } from "@testing-library/react";
import HealthQuestion from "../components/HealthQuestion";
import jsonData from "../constant/constant";

import "@testing-library/jest-dom";

const Constants = jsonData;
const mockProps = {
  questions: Constants.questions,
  currentQuestion: 0,
  handleAnswer: jest.fn(),
  selectedOption: null,
  questionLength: Constants.questions.length,
  handleNext: jest.fn(),
};
test("renders answer buttons", () => {
  render(<HealthQuestion {...mockProps} />);
  const answerButtons = screen.getAllByTestId("option-button");
  expect(answerButtons).toHaveLength(2);
});

test("calls handleAnswer when an answer button is clicked", () => {
  render(<HealthQuestion {...mockProps} />);
  const answerButton = screen.getByText("Yes");
  fireEvent.click(answerButton);
  expect(mockProps.handleAnswer).toHaveBeenCalledWith(
    0,
    Constants.questions[0].answers[0]
  );
});
test("renders the 'Next' button", () => {
  render(<HealthQuestion {...mockProps} />);
  const nextButton = screen.getByText("Next");
  expect(nextButton).toBeInTheDocument();
});
test("calls handleNext when 'Next' button is clicked", () => {
  render(<HealthQuestion {...mockProps} />);
  const nextButton = screen.getByText("Next");

  fireEvent.click(nextButton);
  expect(mockProps.handleNext).toBeDefined();
});
