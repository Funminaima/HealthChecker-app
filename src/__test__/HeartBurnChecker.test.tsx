import { render, screen, fireEvent } from "@testing-library/react";

import HeartBurnChecker from "../components/HeartBurnChecker";

import jsonData from "../constant/constant";

import "@testing-library/jest-dom";

// jest.mock("./HeartBurnChecker");
const Constants = jsonData;

const mockProps2 = {
  questions: Constants.questions,
  currentQuestion: 0,
  handleAnswer: jest.fn(),
  selectedOption: null,
  questionLength: Constants.questions.length,
  handleNext: jest.fn(),
  handleClickBackHome: jest.fn(),
  handlePrevious: jest.fn(),
  showResult: false,
  outcome: "outcome",
};
describe("HeartBurnChecker", () => {
  test("renders without errors", () => {
    render(<HeartBurnChecker {...mockProps2} />);
  });

  test("Render the first question when showResult state is false", () => {
    // render(<HeartBurnChecker />);
    const { getByText } = render(<HeartBurnChecker {...mockProps2} />);
    const firstQuestionText = getByText("Is your heartburn previously known?");
    expect(firstQuestionText).toBeInTheDocument();
  });

  test("renders Outcome component when showResult is true", () => {
    const propsWithResult = { ...mockProps2, showResult: true };
    render(<HeartBurnChecker {...propsWithResult} />);

    const outcomeHeader = screen.getByText(
      "Thank you for answering the question"
    );
    expect(outcomeHeader).toBeInTheDocument();
    const sampleOutcomeText = screen.getByText("outcome");
    expect(sampleOutcomeText).toBeInTheDocument();
  });

  test("calls handlePrevious when 'Back' button is clicked", () => {
    render(<HeartBurnChecker {...mockProps2} />);
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    expect(mockProps2.handlePrevious).toHaveBeenCalled();
  });
});
