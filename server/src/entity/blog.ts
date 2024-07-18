import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    Index,
} from 'typeorm'
import { User } from './users'
import { Liked } from './liked'
import { View } from './view'

@Entity()
@Index(['title'])   
@Index(['tag'])     
@Index(['user']) 
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255 })
    title: string

    @Column({ type: 'varchar', length: 255 })
    imageUrl: string

    @Column({ type: 'varchar', length: 255 })
    tag: string

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'boolean', default: false })
    isDraft: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.blog)
    user: User

    @OneToMany(() => Liked, (liked) => liked.blog)
    liked: Liked[]

    @OneToMany(() => View, (view) => view.blog)
    view: View[]
}
