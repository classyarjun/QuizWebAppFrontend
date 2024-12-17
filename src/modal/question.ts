
export class Question {
  id?: number;
  questionText: string = '';
  options: string[] = [];
  correctAnswer: string = '';
  domain: string = ''; // e.g., Java, Python
}
