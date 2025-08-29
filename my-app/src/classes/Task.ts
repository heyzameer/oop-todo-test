// src/classes/Task.ts
export class Task {
  id: number;
  title: string;
  completed: boolean;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  toggleComplete(): void {
    this.completed = !this.completed;
  }

  getDetails(): string {
    return `${this.title} - ${this.completed ? "Done ✅" : "Pending ❌"}`;
  }
}
