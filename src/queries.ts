// Example GraphQL queries for testing the API

export const queries = {
  // Get all users with their posts
  getAllUsers: `
    query GetAllUsers {
      users {
        id
        username
        email
        firstName
        lastName
        createdAt
        posts {
          id
          title
          published
          createdAt
        }
      }
    }
  `,

  // Get a specific user by ID
  getUserById: `
    query GetUserById($id: ID!) {
      user(id: $id) {
        id
        username
        email
        firstName
        lastName
        createdAt
        posts {
          id
          title
          content
          published
          createdAt
          likeCount
          commentCount
        }
        comments {
          id
          content
          createdAt
          post {
            id
            title
          }
        }
      }
    }
  `,

  // Get all published posts with author and stats
  getPublishedPosts: `
    query GetPublishedPosts {
      publishedPosts {
        id
        title
        content
        published
        createdAt
        author {
          id
          username
          firstName
          lastName
        }
        categories {
          id
          name
        }
        tags {
          id
          name
        }
        likeCount
        commentCount
      }
    }
  `,

  // Get a specific post with all related data
  getPostById: `
    query GetPostById($id: ID!) {
      post(id: $id) {
        id
        title
        content
        published
        createdAt
        author {
          id
          username
          firstName
          lastName
        }
        categories {
          id
          name
          description
        }
        tags {
          id
          name
        }
        comments {
          id
          content
          createdAt
          author {
            id
            username
          }
          replies {
            id
            content
            createdAt
            author {
              id
              username
            }
          }
        }
        likes {
          id
          createdAt
          user {
            id
            username
          }
        }
        likeCount
        commentCount
      }
    }
  `,

  // Get posts by category
  getPostsByCategory: `
    query GetPostsByCategory($categoryId: ID!) {
      postsByCategory(categoryId: $categoryId) {
        id
        title
        content
        published
        createdAt
        author {
          id
          username
        }
        likeCount
        commentCount
      }
    }
  `,

  // Get all categories with their posts
  getCategories: `
    query GetCategories {
      categories {
        id
        name
        description
        createdAt
        posts {
          id
          title
          published
          createdAt
        }
      }
    }
  `,

  // Get all tags
  getTags: `
    query GetTags {
      tags {
        id
        name
        createdAt
        posts {
          id
          title
          published
        }
      }
    }
  `,

  // Get post statistics
  getPostStats: `
    query GetPostStats {
      postStats {
        id
        title
        published
        author
        commentCount
        likeCount
        categoryCount
        tagCount
      }
    }
  `,

  // Search posts by author
  getPostsByAuthor: `
    query GetPostsByAuthor($authorId: ID!) {
      postsByAuthor(authorId: $authorId) {
        id
        title
        content
        published
        createdAt
        likeCount
        commentCount
        categories {
          id
          name
        }
        tags {
          id
          name
        }
      }
    }
  `,
};

export const mutations = {
  // Create a new user
  createUser: `
    mutation CreateUser($username: String!, $email: String!, $firstName: String!, $lastName: String!) {
      createUser(username: $username, email: $email, firstName: $firstName, lastName: $lastName) {
        id
        username
        email
        firstName
        lastName
        createdAt
      }
    }
  `,

  // Create a new post
  createPost: `
    mutation CreatePost($title: String!, $content: String!, $authorId: ID!, $published: Boolean) {
      createPost(title: $title, content: $content, authorId: $authorId, published: $published) {
        id
        title
        content
        published
        createdAt
        author {
          id
          username
        }
      }
    }
  `,

  // Create a new comment
  createComment: `
    mutation CreateComment($content: String!, $authorId: ID!, $postId: ID!, $parentCommentId: ID) {
      createComment(content: $content, authorId: $authorId, postId: $postId, parentCommentId: $parentCommentId) {
        id
        content
        createdAt
        author {
          id
          username
        }
        post {
          id
          title
        }
      }
    }
  `,

  // Like a post
  likePost: `
    mutation LikePost($userId: ID!, $postId: ID!) {
      likePost(userId: $userId, postId: $postId) {
        id
        createdAt
        user {
          id
          username
        }
        post {
          id
          title
        }
      }
    }
  `,

  // Unlike a post
  unlikePost: `
    mutation UnlikePost($userId: ID!, $postId: ID!) {
      unlikePost(userId: $userId, postId: $postId)
    }
  `,

  // Update a post
  updatePost: `
    mutation UpdatePost($id: ID!, $title: String, $content: String, $published: Boolean) {
      updatePost(id: $id, title: $title, content: $content, published: $published) {
        id
        title
        content
        published
        updatedAt
      }
    }
  `,
}; 