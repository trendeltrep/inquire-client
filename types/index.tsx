export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
  
export interface Comment {
    id: number;
    postId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}
