import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch
} from 'react';

export type Blog = {
    id: string;
    title: string;
    content: string;
    tag: string;
    imageUrl: string;
};

type BlogContextType = {
    blogs: Blog[];
    dispatch: Dispatch<BlogAction>;
};

type BlogAction = 
    | { type: 'SET_BLOGS'; payload: Blog[] }
    | { type: 'UPDATE_BLOG'; payload: Blog }
    | {type: 'DELETE_BLOG'; payload: string}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const blogReducer = (state: Blog[], action: BlogAction): Blog[] => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.payload;
        case 'UPDATE_BLOG':
            return state.map(blog =>
                blog.id === action.payload.id ? action.payload : blog
            );
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id != action.payload)
        default:
            return state;
    }
};

export const useBlogContext = (): BlogContextType => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlogContext must be used within a BlogContextProvider');
    }
    return context;
};

type BlogContextProviderProps = {
    children: ReactNode;
};

export const BlogContextProvider = ({ children }: BlogContextProviderProps) => {
    const [blogs, dispatch] = useReducer(blogReducer, []);


    const contextValue: BlogContextType = {
        blogs,
        dispatch
    };

    return (
        <BlogContext.Provider value={contextValue}>
            {children}
        </BlogContext.Provider>
    );
};
