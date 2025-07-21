import { gql } from 'apollo-server-express';
import pool from './database';
import { User, Post, Comment, Category, Tag, PostStats } from './types';

// GraphQL Schema
export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
    comments: [Comment!]!
    categories: [Category!]!
    tags: [Tag!]!
    likes: [Like!]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    parentComment: Comment
    replies: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    createdAt: String!
    posts: [Post!]!
  }

  type Tag {
    id: ID!
    name: String!
    createdAt: String!
    posts: [Post!]!
  }

  type Like {
    id: ID!
    user: User!
    post: Post!
    createdAt: String!
  }

  type PostStats {
    id: ID!
    title: String!
    published: Boolean!
    author: String!
    commentCount: Int!
    likeCount: Int!
    categoryCount: Int!
    tagCount: Int!
  }

  type Query {
    # User queries
    users: [User!]!
    user(id: ID!): User
    userByUsername(username: String!): User

    # Post queries
    posts: [Post!]!
    post(id: ID!): Post
    postsByAuthor(authorId: ID!): [Post!]!
    publishedPosts: [Post!]!
    postsByCategory(categoryId: ID!): [Post!]!
    postsByTag(tagId: ID!): [Post!]!

    # Comment queries
    comments: [Comment!]!
    commentsByPost(postId: ID!): [Comment!]!
    commentsByAuthor(authorId: ID!): [Comment!]!

    # Category queries
    categories: [Category!]!
    category(id: ID!): Category

    # Tag queries
    tags: [Tag!]!
    tag(id: ID!): Tag

    # Stats queries
    postStats: [PostStats!]!
    postStatsById(id: ID!): PostStats
  }

  type Mutation {
    # User mutations
    createUser(username: String!, email: String!, firstName: String!, lastName: String!): User!
    updateUser(id: ID!, username: String, email: String, firstName: String, lastName: String): User!
    deleteUser(id: ID!): Boolean!

    # Post mutations
    createPost(title: String!, content: String!, authorId: ID!, published: Boolean): Post!
    updatePost(id: ID!, title: String, content: String, published: Boolean): Post!
    deletePost(id: ID!): Boolean!

    # Comment mutations
    createComment(content: String!, authorId: ID!, postId: ID!, parentCommentId: ID): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Boolean!

    # Like mutations
    likePost(userId: ID!, postId: ID!): Like!
    unlikePost(userId: ID!, postId: ID!): Boolean!
  }
`;

// Resolvers
export const resolvers = {
  Query: {
    // User queries
    users: async (): Promise<User[]> => {
      const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      return result.rows;
    },

    user: async (_: any, { id }: { id: string }): Promise<User | null> => {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
    },

    userByUsername: async (_: any, { username }: { username: string }): Promise<User | null> => {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      return result.rows[0] || null;
    },

    // Post queries
    posts: async (): Promise<Post[]> => {
      const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
      return result.rows;
    },

    post: async (_: any, { id }: { id: string }): Promise<Post | null> => {
      const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
      return result.rows[0] || null;
    },

    postsByAuthor: async (_: any, { authorId }: { authorId: string }): Promise<Post[]> => {
      const result = await pool.query('SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC', [authorId]);
      return result.rows;
    },

    publishedPosts: async (): Promise<Post[]> => {
      const result = await pool.query('SELECT * FROM posts WHERE published = true ORDER BY created_at DESC');
      return result.rows;
    },

    postsByCategory: async (_: any, { categoryId }: { categoryId: string }): Promise<Post[]> => {
      const result = await pool.query(`
        SELECT p.* FROM posts p
        JOIN post_categories pc ON p.id = pc.post_id
        WHERE pc.category_id = $1
        ORDER BY p.created_at DESC
      `, [categoryId]);
      return result.rows;
    },

    postsByTag: async (_: any, { tagId }: { tagId: string }): Promise<Post[]> => {
      const result = await pool.query(`
        SELECT p.* FROM posts p
        JOIN post_tags pt ON p.id = pt.post_id
        WHERE pt.tag_id = $1
        ORDER BY p.created_at DESC
      `, [tagId]);
      return result.rows;
    },

    // Comment queries
    comments: async (): Promise<Comment[]> => {
      const result = await pool.query('SELECT * FROM comments ORDER BY created_at DESC');
      return result.rows;
    },

    commentsByPost: async (_: any, { postId }: { postId: string }): Promise<Comment[]> => {
      const result = await pool.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [postId]);
      return result.rows;
    },

    commentsByAuthor: async (_: any, { authorId }: { authorId: string }): Promise<Comment[]> => {
      const result = await pool.query('SELECT * FROM comments WHERE author_id = $1 ORDER BY created_at DESC', [authorId]);
      return result.rows;
    },

    // Category queries
    categories: async (): Promise<Category[]> => {
      const result = await pool.query('SELECT * FROM categories ORDER BY name');
      return result.rows;
    },

    category: async (_: any, { id }: { id: string }): Promise<Category | null> => {
      const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
      return result.rows[0] || null;
    },

    // Tag queries
    tags: async (): Promise<Tag[]> => {
      const result = await pool.query('SELECT * FROM tags ORDER BY name');
      return result.rows;
    },

    tag: async (_: any, { id }: { id: string }): Promise<Tag | null> => {
      const result = await pool.query('SELECT * FROM tags WHERE id = $1', [id]);
      return result.rows[0] || null;
    },

    // Stats queries
    postStats: async (): Promise<PostStats[]> => {
      const result = await pool.query('SELECT * FROM post_stats ORDER BY like_count DESC');
      return result.rows;
    },

    postStatsById: async (_: any, { id }: { id: string }): Promise<PostStats | null> => {
      const result = await pool.query('SELECT * FROM post_stats WHERE id = $1', [id]);
      return result.rows[0] || null;
    },
  },

  Mutation: {
    // User mutations
    createUser: async (_: any, { username, email, firstName, lastName }: { username: string; email: string; firstName: string; lastName: string }): Promise<User> => {
      const result = await pool.query(
        'INSERT INTO users (username, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, firstName, lastName]
      );
      return result.rows[0];
    },

    updateUser: async (_: any, { id, ...updates }: { id: string; username?: string; email?: string; firstName?: string; lastName?: string }): Promise<User> => {
      const fields = Object.keys(updates).map((key, index) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${index + 2}`).join(', ');
      const values = Object.values(updates).filter(v => v !== undefined);
      const result = await pool.query(
        `UPDATE users SET ${fields} WHERE id = $1 RETURNING *`,
        [id, ...values]
      );
      return result.rows[0];
    },

    deleteUser: async (_: any, { id }: { id: string }): Promise<boolean> => {
      const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
      return result.rowCount > 0;
    },

    // Post mutations
    createPost: async (_: any, { title, content, authorId, published = false }: { title: string; content: string; authorId: string; published?: boolean }): Promise<Post> => {
      const result = await pool.query(
        'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, content, authorId, published]
      );
      return result.rows[0];
    },

    updatePost: async (_: any, { id, ...updates }: { id: string; title?: string; content?: string; published?: boolean }): Promise<Post> => {
      const fields = Object.keys(updates).map((key, index) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${index + 2}`).join(', ');
      const values = Object.values(updates).filter(v => v !== undefined);
      const result = await pool.query(
        `UPDATE posts SET ${fields} WHERE id = $1 RETURNING *`,
        [id, ...values]
      );
      return result.rows[0];
    },

    deletePost: async (_: any, { id }: { id: string }): Promise<boolean> => {
      const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
      return result.rowCount > 0;
    },

    // Comment mutations
    createComment: async (_: any, { content, authorId, postId, parentCommentId }: { content: string; authorId: string; postId: string; parentCommentId?: string }): Promise<Comment> => {
      const result = await pool.query(
        'INSERT INTO comments (content, author_id, post_id, parent_comment_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [content, authorId, postId, parentCommentId]
      );
      return result.rows[0];
    },

    updateComment: async (_: any, { id, content }: { id: string; content: string }): Promise<Comment> => {
      const result = await pool.query('UPDATE comments SET content = $2 WHERE id = $1 RETURNING *', [id, content]);
      return result.rows[0];
    },

    deleteComment: async (_: any, { id }: { id: string }): Promise<boolean> => {
      const result = await pool.query('DELETE FROM comments WHERE id = $1', [id]);
      return result.rowCount > 0;
    },

    // Like mutations
    likePost: async (_: any, { userId, postId }: { userId: string; postId: string }): Promise<any> => {
      const result = await pool.query(
        'INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *',
        [userId, postId]
      );
      return result.rows[0];
    },

    unlikePost: async (_: any, { userId, postId }: { userId: string; postId: string }): Promise<boolean> => {
      const result = await pool.query('DELETE FROM likes WHERE user_id = $1 AND post_id = $2', [userId, postId]);
      return result.rowCount > 0;
    },
  },

  User: {
    posts: async (parent: User): Promise<Post[]> => {
      const result = await pool.query('SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC', [parent.id]);
      return result.rows;
    },

    comments: async (parent: User): Promise<Comment[]> => {
      const result = await pool.query('SELECT * FROM comments WHERE author_id = $1 ORDER BY created_at DESC', [parent.id]);
      return result.rows;
    },

    firstName: (parent: User) => parent.first_name,
    lastName: (parent: User) => parent.last_name,
    createdAt: (parent: User) => parent.created_at.toISOString(),
    updatedAt: (parent: User) => parent.updated_at.toISOString(),
  },

  Post: {
    author: async (parent: Post): Promise<User> => {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [parent.author_id]);
      return result.rows[0];
    },

    comments: async (parent: Post): Promise<Comment[]> => {
      const result = await pool.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [parent.id]);
      return result.rows;
    },

    categories: async (parent: Post): Promise<Category[]> => {
      const result = await pool.query(`
        SELECT c.* FROM categories c
        JOIN post_categories pc ON c.id = pc.category_id
        WHERE pc.post_id = $1
      `, [parent.id]);
      return result.rows;
    },

    tags: async (parent: Post): Promise<Tag[]> => {
      const result = await pool.query(`
        SELECT t.* FROM tags t
        JOIN post_tags pt ON t.id = pt.tag_id
        WHERE pt.post_id = $1
      `, [parent.id]);
      return result.rows;
    },

    likes: async (parent: Post): Promise<any[]> => {
      const result = await pool.query('SELECT * FROM likes WHERE post_id = $1', [parent.id]);
      return result.rows;
    },

    likeCount: async (parent: Post): Promise<number> => {
      const result = await pool.query('SELECT COUNT(*) FROM likes WHERE post_id = $1', [parent.id]);
      return parseInt(result.rows[0].count);
    },

    commentCount: async (parent: Post): Promise<number> => {
      const result = await pool.query('SELECT COUNT(*) FROM comments WHERE post_id = $1', [parent.id]);
      return parseInt(result.rows[0].count);
    },

    createdAt: (parent: Post) => parent.created_at.toISOString(),
    updatedAt: (parent: Post) => parent.updated_at.toISOString(),
  },

  Comment: {
    author: async (parent: Comment): Promise<User> => {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [parent.author_id]);
      return result.rows[0];
    },

    post: async (parent: Comment): Promise<Post> => {
      const result = await pool.query('SELECT * FROM posts WHERE id = $1', [parent.post_id]);
      return result.rows[0];
    },

    parentComment: async (parent: Comment): Promise<Comment | null> => {
      if (!parent.parent_comment_id) return null;
      const result = await pool.query('SELECT * FROM comments WHERE id = $1', [parent.parent_comment_id]);
      return result.rows[0] || null;
    },

    replies: async (parent: Comment): Promise<Comment[]> => {
      const result = await pool.query('SELECT * FROM comments WHERE parent_comment_id = $1 ORDER BY created_at ASC', [parent.id]);
      return result.rows;
    },

    createdAt: (parent: Comment) => parent.created_at.toISOString(),
    updatedAt: (parent: Comment) => parent.updated_at.toISOString(),
  },

  Category: {
    posts: async (parent: Category): Promise<Post[]> => {
      const result = await pool.query(`
        SELECT p.* FROM posts p
        JOIN post_categories pc ON p.id = pc.post_id
        WHERE pc.category_id = $1
        ORDER BY p.created_at DESC
      `, [parent.id]);
      return result.rows;
    },

    createdAt: (parent: Category) => parent.created_at.toISOString(),
  },

  Tag: {
    posts: async (parent: Tag): Promise<Post[]> => {
      const result = await pool.query(`
        SELECT p.* FROM posts p
        JOIN post_tags pt ON p.id = pt.post_id
        WHERE pt.tag_id = $1
        ORDER BY p.created_at DESC
      `, [parent.id]);
      return result.rows;
    },

    createdAt: (parent: Tag) => parent.created_at.toISOString(),
  },

  Like: {
    user: async (parent: any): Promise<User> => {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [parent.user_id]);
      return result.rows[0];
    },

    post: async (parent: any): Promise<Post> => {
      const result = await pool.query('SELECT * FROM posts WHERE id = $1', [parent.post_id]);
      return result.rows[0];
    },

    createdAt: (parent: any) => parent.created_at.toISOString(),
  },
}; 