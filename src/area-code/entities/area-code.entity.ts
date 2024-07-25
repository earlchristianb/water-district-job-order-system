import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
export class AreaCode {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  code: string;

  @Column({
    nullable: false,
  })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
