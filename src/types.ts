export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: number;
  content: string;
  author_id: number;
  post_id: number;
  parent_comment_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
}

export interface Tag {
  id: number;
  name: string;
  created_at: Date;
}

export interface Like {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
}

export interface PostStats {
  id: number;
  title: string;
  published: boolean;
  author: string;
  comment_count: number;
  like_count: number;
  category_count: number;
  tag_count: number;
} 