// src/classes/WorkTask.ts
import { Task } from "./Task";

export class WorkTask extends Task {
  deadline: string;

  constructor(id: number, title: string, deadline: string) {
    super(id, title); // call parent constructor
    this.deadline = deadline;
  }

  // Polymorphism: overriding getDetails
  getDetails(): string {
    return `🧑‍💻 Work: ${this.title} (Deadline: ${this.deadline}) - ${this.completed ? "✅" : "❌"}`;
  }
}
