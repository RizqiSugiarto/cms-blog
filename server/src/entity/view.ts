import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Unique,
    Index,
} from 'typeorm'
import { Blog } from './blog'

@Entity()
@Index(['blog']) 
export class View {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Blog, (blog) => blog.view)
    blog: Blog

    @CreateDateColumn()
    createdAt: Date
}
