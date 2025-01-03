import {User} from "../interfaces/UserType"
export interface Post {
    id?: number, 
    title: string;
    summary: string;
    content: string;
    author?: string;
    likedBy?: [];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePostRequest {
    title: string;
    summary: string;
    content: string;
}

export interface UpdatePostRequest {
    title: string;
    summary: string;
    content: string;
}

export interface BlogCardPost {
    post: Post;
}

export interface PostPageProps {
    posts: Post[] | [];
    user: User | null;
}

export interface PostListProps {
    user: User | null;
    posts: Post[] | [];
    deletePost: (id: number) => Promise<void>;
    editPost:(id: number,postData: UpdatePostRequest) => Promise<void>;
}

export interface EditPostProps {
    posts: Post[] | [];
    editPost:(id: number, postData: UpdatePostRequest) => Promise<void>;
}

export interface MyPostsProps {
    user: User | null;                                                                            
    posts: Post[] | [];                                                                                                                                                    
    editPost:(id: number, postData: UpdatePostRequest) => Promise<void>;                                                                        
    deletePost: (id: number) => Promise<void>;  
}

export interface HomeProps {
    user: User | null;
    posts: Post[] | [];  
    editPost:(id: number, postData: UpdatePostRequest) => Promise<void>;                                                                        
    deletePost: (id: number) => Promise<void>;  
}


export interface PostFormProps {
    post?: Post | null;
    onSubmit: (formData: Post) => void;
    title: string;
    onSuccess?: () => void;
    cancelMessage?: string | null;
    successMessage?: string | null;
  }
  
  export interface CreatePostProps {
    createPost: (postData: CreatePostRequest) => Promise<void>;
    errorMessage?: string | null;
  }
  