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
// @Unique(['blog', 'user']) // Unique constraint
@Index(['blog']) // Index for BlogId
export class View {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Blog, (blog) => blog.view)
    blog: Blog

    @CreateDateColumn()
    createdAt: Date
}
