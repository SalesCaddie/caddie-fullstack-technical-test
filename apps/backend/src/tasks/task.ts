import { v4 as uuidv4 } from 'uuid';

interface Args{
  id?: string;
  title: string;
}

export class Task{
  readonly id!: string;
  title!: string;

  constructor({id = uuidv4(), title}:Args){
    this.id = id;
    this.title = title;
  }
}
