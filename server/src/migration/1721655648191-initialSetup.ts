import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class InitTables1659634074032 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExistenceChecks = {
            user: await queryRunner.hasTable('user'),
            blog: await queryRunner.hasTable('blog'),
            liked: await queryRunner.hasTable('liked'),
            view: await queryRunner.hasTable('view'),
        };

        // Create User table if it doesn't exist
        if (!tableExistenceChecks.user) {
            await queryRunner.createTable(new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'char',
                        length: '36',
                        isPrimary: true,
                        isGenerated: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'ImageUrl',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }), true);

            // Create unique index on email
            await queryRunner.createIndex('user', new TableIndex({
                name: 'IDX_USER_EMAIL',
                columnNames: ['email'],
                isUnique: true,
            }));
        }

        // Create Blog table if it doesn't exist
        if (!tableExistenceChecks.blog) {
            await queryRunner.createTable(new Table({
                name: 'blog',
                columns: [
                    {
                        name: 'id',
                        type: 'char',
                        length: '36',
                        isPrimary: true,
                        isGenerated: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'imageUrl',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'tag',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'content',
                        type: 'text',
                    },
                    {
                        name: 'isDraft',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'userId',
                        type: 'char',
                        length: '36',
                    },
                ],
            }), true);

            // Create indexes on Blog
            await queryRunner.createIndex('blog', new TableIndex({
                name: 'IDX_BLOG_TITLE',
                columnNames: ['title'],
            }));
            await queryRunner.createIndex('blog', new TableIndex({
                name: 'IDX_BLOG_TAG',
                columnNames: ['tag'],
            }));
            await queryRunner.createIndex('blog', new TableIndex({
                name: 'IDX_BLOG_USER',
                columnNames: ['userId'],
            }));

            // Create foreign key for Blog.userId
            await queryRunner.createForeignKey('blog', new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
            }));
        }

        // Create Liked table if it doesn't exist
        if (!tableExistenceChecks.liked) {
            await queryRunner.createTable(new Table({
                name: 'liked',
                columns: [
                    {
                        name: 'id',
                        type: 'char',
                        length: '36',
                        isPrimary: true,
                        isGenerated: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'blogId',
                        type: 'char',
                        length: '36',
                    },
                    {
                        name: 'userId',
                        type: 'char',
                        length: '36',
                    },
                ],
            }), true);

            // Create indexes on Liked
            await queryRunner.createIndex('liked', new TableIndex({
                name: 'IDX_LIKED_BLOG',
                columnNames: ['blogId'],
            }));
            await queryRunner.createIndex('liked', new TableIndex({
                name: 'IDX_LIKED_USER',
                columnNames: ['userId'],
            }));

            // Create foreign keys for Liked
            await queryRunner.createForeignKey('liked', new TableForeignKey({
                columnNames: ['blogId'],
                referencedTableName: 'blog',
                referencedColumnNames: ['id'],
            }));
            await queryRunner.createForeignKey('liked', new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
            }));
        }

        // Create View table if it doesn't exist
        if (!tableExistenceChecks.view) {
            await queryRunner.createTable(new Table({
                name: 'view',
                columns: [
                    {
                        name: 'id',
                        type: 'char',
                        length: '36',
                        isPrimary: true,
                        isGenerated: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'blogId',
                        type: 'char',
                        length: '36',
                    },
                ],
            }), true);

            // Create index on View.blogId
            await queryRunner.createIndex('view', new TableIndex({
                name: 'IDX_VIEW_BLOG',
                columnNames: ['blogId'],
            }));

            // Create foreign key for View.blogId
            await queryRunner.createForeignKey('view', new TableForeignKey({
                columnNames: ['blogId'],
                referencedTableName: 'blog',
                referencedColumnNames: ['id'],
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        await queryRunner.dropForeignKey('liked', 'FK_liked_blogId');
        await queryRunner.dropForeignKey('liked', 'FK_liked_userId');
        await queryRunner.dropForeignKey('view', 'FK_view_blogId');
        await queryRunner.dropForeignKey('blog', 'FK_blog_userId');

        // Drop tables
        await queryRunner.dropTable('view');
        await queryRunner.dropTable('liked');
        await queryRunner.dropTable('blog');
        await queryRunner.dropTable('user');
    }
}
