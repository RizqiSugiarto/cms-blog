import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    Index,
} from 'typeorm'
import { Blog } from './blog'
import { Liked } from './liked'

@Entity()
@Index(['email'], { unique: true })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'varchar', length: 255 })
    ImageUrl: string

    @Column({ type: 'varchar', length: 255 })
    role: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Blog, (blog) => blog.user)
    blog: Blog[]

    @OneToMany(() => Liked, (liked) => liked.user)
    liked: Liked[]
}
