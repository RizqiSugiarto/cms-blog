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
    content: string;
    tag: string;
    userId: string;
    image?: File;
    isDraft: boolean;
};

export type UpdateBlogRequest = {
    title: string;
    content: string;
    blogId: string;
    image?: File;
    isDraft: boolean;
    tag: string;
};

export type UpdateProfileRequest = {
    userId: string;
    name: string;
    email: string;
    imageProfile?: File;
};
