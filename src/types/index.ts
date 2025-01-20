export interface ExampleType {
    id: number;
    name: string;
    description?: string;
}

export type User = {
    id: string;
    username: string;
    email: string;
};

export interface Post {
    title: string;
    content: string;
    author: User;
    createdAt: Date;
}