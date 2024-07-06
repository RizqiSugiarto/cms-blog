export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type CreateblogRequest = {
    title: string;
    text: string;
    tag: string;
};

export type UpdateBlogRequest = {
    title: string;
    content: string;
    imageUrl: string;
    isDraft: boolean;
    tag: string;
};
