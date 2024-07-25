import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class AreaCode {
  @ApiProperty({
    example: uuidv4(),
    description: 'The generated uuid for the AreaCode',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'AY',
    description: 'Unique Code for the Area',
    maxLength: 2,
    minLength: 2,
    required: true,
    uniqueItems: true,
  })
  @Column({
    nullable: false,
    unique: true,
  })
  code: string;

  @ApiProperty({
    example: 'Area Code for (Barangay Name),Zamboanga City',
    description: 'Unique Code for the Area',
    maxLength: 100,
    required: true,
  })
  @Column({
    nullable: false,
  })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  transformCodeToUppercase() {
    this.code = this.code.toUpperCase();
  }
}
