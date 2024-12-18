
export enum Status {
  PASS = 'PASS',
  FAIL = 'FAIL',
}

export interface UserScore {
  id?: number; // Optional for new users
  name: string;
  domain: string;
  email: string;
  contactNo?: string; // Optional field
  score: number;
  attemptQuestions: number;
  status: Status;
  correctAnswers:number;
}
