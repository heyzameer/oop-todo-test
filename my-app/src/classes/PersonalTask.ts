// src/classes/PersonalTask.ts
import { Task } from "./Task";

export class PersonalTask extends Task {
  category: string;

  constructor(id: number, title: string, category: string) {
    super(id, title);
    this.category = category;
  }

  // Polymorphism
  getDetails(): string {
    return `🏠 Personal: ${this.title} [${this.category}] - ${this.completed ? "✅" : "❌"}`;
  }
}
