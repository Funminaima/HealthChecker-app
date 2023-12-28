// constants.ts
export interface Answer {
  id: string;
  label: string;
  score: number;
  isSelected?: boolean;
}

export interface NextStep {
  answered?: string;
  next_question: string;
  max_score?: number | undefined;
  outcome?: string;
}

export interface Question {
  id: string;
  question_text: string;
  answers: Answer[];
  next: NextStep[];
}

export interface Outcome {
  id: string;
  text: string;
  show_booking_button: boolean;
}

export interface ConstantData {
  questions: Question[];
  outcomes: Outcome[];
}
