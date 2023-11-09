import { v4 as uuidv4 } from 'uuid';

interface Args {
  id?: string;
  title: string;
  description: string;
  dueDate: Date;
  order: number;
}

export class Task {
  readonly id!: string;
  title!: string;
  description!: string;
  dueDate!: Date;
  order!: number;

  constructor({ id = uuidv4(), title, description, dueDate, order }: Args) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.order = order;
  }
}
