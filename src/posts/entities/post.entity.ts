import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn() // auto inc int
  id: number;

  @Column()
  title: string;
}
