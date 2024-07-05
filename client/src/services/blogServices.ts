const BaseUrl = import.meta.env.VITE_BASE_URL

type createblogRequest = {
    title: string
    content: string
    isDraft: boolean
    tag: string
}

type updateBlogRequest = {
    title: string
    content: string
    imageUrl: string
    isDraft: boolean
    tag: string
}

export const createBlog = async (blogRequest: createblogRequest) => {
    try {
        const response = await fetch(`${BaseUrl}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogRequest)
        })

        if(!response) {
            throw new Error('create blog failed')
        }
        return response.json()
    } catch (error) {
        console.error('create blog failed', error)
    }
}

export const getBlogsBySimilarName = async (userId: string, title: string) => {
    try {
        const response = await fetch(`${BaseUrl}/blogs/similar?userId=${userId}&title=${title}`);

        if (!response.ok) {
            throw new Error('Failed to fetch blogs by similar name');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching blogs by similar name:', error);
        throw new Error('Failed to fetch blogs by similar name');
    }
};

export const getMostViewedBlogByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/blogs/view/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch most viewed blog');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching most viewed blog:', error);
        throw new Error('Failed to fetch most viewed blog');
    }
};

export const updateBlog = async (blogId: string, blogRequest: updateBlogRequest) => {
    try {
        const response = await fetch(`${BaseUrl}/blogs/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogRequest)
        });

        if (!response.ok) {
            throw new Error('Failed to update blog');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating blog:', error);
        throw new Error('Failed to update blog');
    }
};

export const deleteBlog = async (blogId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/blogs/${blogId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }

        return 'Blog deleted successfully';
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw new Error('Failed to delete blog');
    }
};

export const getAllBlogsByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/blogs/user/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch blogs by user ID');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching blogs by user ID:', error);
        throw new Error('Failed to fetch blogs by user ID');
    }
};

export const getAllBlogsDraftByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/blogs/draft/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch draft blogs by user ID');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching draft blogs by user ID:', error);
        throw new Error('Failed to fetch draft blogs by user ID');
    }
};

export const getBlogById = async (blogId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/blogs/${blogId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch blog by ID');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        throw new Error('Failed to fetch blog by ID');
    }
};

