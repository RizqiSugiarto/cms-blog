import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Unique,
    Index,
} from 'typeorm'
import { Blog } from './blog'
import { User } from './users'

@Entity()
@Index(['blog']) 
@Index(['user']) 
export class Liked {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Blog, (blog) => blog.liked)
    blog: Blog

    @ManyToOne(() => User, (user) => user.liked)
    user: User

    @CreateDateColumn()
    createdAt: Date
}
