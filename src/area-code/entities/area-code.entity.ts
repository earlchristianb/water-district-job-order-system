import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
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

  @BeforeInsert()
  @BeforeUpdate()
  transformCodeToUppercase() {
    this.code = this.code.toUpperCase();
  }
}
