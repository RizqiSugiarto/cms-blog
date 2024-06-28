import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Article } from './artichels';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Article, article => article.user)
  articles: Article[];
}
