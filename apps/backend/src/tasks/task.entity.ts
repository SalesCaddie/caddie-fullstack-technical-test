import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'date' })
  dueDate!: string;
}
