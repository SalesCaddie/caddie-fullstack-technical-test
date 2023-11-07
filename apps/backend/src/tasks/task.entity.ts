import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  dueDate!: Date;

  @Column({ type: 'int', default: 0 })
  order!: number;
}
