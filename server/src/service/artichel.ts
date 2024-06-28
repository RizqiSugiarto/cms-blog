import { Article } from '@/entity/artichels';
import { User } from '@/entity/users';
import connectDb from '@/db/mysql';
import { ArticleDto } from '@/dto/artichel';

export class ArticleService {
    private articleRepository = connectDb.getRepository(Article);
    private userRepository = connectDb.getRepository(User);

    async createArticle(articleData: ArticleDto): Promise<string> {
        try {
            const user = await this.userRepository.findOne({ where: { id: articleData.userId } });
            if (!user) {
                throw new Error('User not found');
            }

            const article = this.articleRepository.create({
                title: articleData.title,
                content: articleData.content,
                tag: articleData.tag,
                user: user,
            });

            await this.articleRepository.save(article);
            return 'Article created successfully';
        } catch (error) {
            console.error('Error creating article:', error);
            throw new Error('Failed to create article');
        }
    }

    async updateArticle(id: string, articleData: ArticleDto): Promise<string> {
        try {
            const article = await this.articleRepository.findOne({ where: { id } });
            if (!article) {
                throw new Error('Article not found');
            }

            article.title = articleData.title;
            article.content = articleData.content;

            if(articleData.tag) article.tag = articleData.tag;

            await this.articleRepository.save(article);
            return 'Article updated successfully';
        } catch (error) {
            console.error('Error updating article:', error);
            throw new Error('Failed to update article');
        }
    }

    async deleteArticle(id: string): Promise<string> {
        try {
            const result = await this.articleRepository.delete(id);
            if (result.affected === 0) {
                throw new Error('Article not found');
            }
            return 'Article deleted successfully';
        } catch (error) {
            console.error('Error deleting article:', error);
            throw new Error('Failed to delete article');
        }
    }

    async getAllArticlesByUserId(userId: string): Promise<Article[]> {
        try {
            return await this.articleRepository.find({ where: { user: { id: userId } } });
        } catch (error) {
            console.error('Error fetching articles by user ID:', error);
            throw new Error('Failed to fetch articles');
        }
    }

    async getArticleById(id: string): Promise<Article | null> {
        try {
            return await this.articleRepository.findOne({ where: { id } });
        } catch (error) {
            console.error('Error fetching article by ID:', error);
            throw new Error('Failed to fetch article');
        }
    }
}
