-- GraphQL Playground Database Setup
-- This file creates tables and populates them with sample data for practicing GraphQL

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create post_categories junction table
CREATE TABLE post_categories (
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- Create tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create post_tags junction table
CREATE TABLE post_tags (
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Create likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- Insert sample users
INSERT INTO users (username, email, first_name, last_name) VALUES
('john_doe', 'john@example.com', 'John', 'Doe'),
('jane_smith', 'jane@example.com', 'Jane', 'Smith'),
('bob_wilson', 'bob@example.com', 'Bob', 'Wilson'),
('alice_johnson', 'alice@example.com', 'Alice', 'Johnson'),
('charlie_brown', 'charlie@example.com', 'Charlie', 'Brown');

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Technology', 'Posts about technology and programming'),
('Travel', 'Travel experiences and tips'),
('Food', 'Recipes and restaurant reviews'),
('Sports', 'Sports news and analysis'),
('Music', 'Music reviews and recommendations');

-- Insert sample tags
INSERT INTO tags (name) VALUES
('javascript'),
('react'),
('graphql'),
('postgresql'),
('docker'),
('travel'),
('food'),
('sports'),
('music'),
('programming');

-- Insert sample posts
INSERT INTO posts (title, content, author_id, published) VALUES
('Getting Started with GraphQL', 'GraphQL is a query language for APIs that provides a complete description of the data in your API...', 1, true),
('My Journey to Japan', 'Last summer, I had the incredible opportunity to visit Japan for three weeks...', 2, true),
('Best Pizza Places in NYC', 'After living in New York for five years, I''ve tried countless pizza places...', 3, true),
('React vs Vue: A Comparison', 'Both React and Vue are excellent frontend frameworks, but they have different philosophies...', 1, true),
('Hiking the Appalachian Trail', 'The Appalachian Trail is one of the most challenging and rewarding experiences...', 4, true),
('Introduction to PostgreSQL', 'PostgreSQL is a powerful, open-source object-relational database system...', 1, false),
('Cooking Perfect Pasta', 'The secret to perfect pasta lies in the technique, not just the ingredients...', 2, true),
('World Cup 2024 Predictions', 'With the World Cup approaching, let''s analyze the top contenders...', 5, true),
('Jazz Music History', 'Jazz emerged in the early 20th century in New Orleans...', 4, true),
('Docker Best Practices', 'Docker has revolutionized how we deploy applications...', 3, true);

-- Link posts to categories
INSERT INTO post_categories (post_id, category_id) VALUES
(1, 1), (4, 1), (6, 1), (10, 1),  -- Technology posts
(2, 2), (5, 2),                    -- Travel posts
(3, 3), (7, 3),                    -- Food posts
(8, 4),                            -- Sports posts
(9, 5);                            -- Music posts

-- Link posts to tags
INSERT INTO post_tags (post_id, tag_id) VALUES
(1, 3), (1, 4),                    -- GraphQL post
(2, 6),                            -- Travel post
(3, 7),                            -- Food post
(4, 1), (4, 2),                    -- React post
(5, 6),                            -- Travel post
(6, 4),                            -- PostgreSQL post
(7, 7),                            -- Food post
(8, 8),                            -- Sports post
(9, 9),                            -- Music post
(10, 5);                           -- Docker post

-- Insert sample comments
INSERT INTO comments (content, author_id, post_id) VALUES
('Great article! GraphQL is indeed powerful.', 2, 1),
('I learned a lot from this post. Thanks!', 3, 1),
('Have you tried Apollo Client with GraphQL?', 4, 1),
('Japan is amazing! Which cities did you visit?', 1, 2),
('I love the food culture there.', 3, 2),
('This pizza guide is spot on!', 4, 3),
('React is definitely my preferred choice.', 2, 4),
('Vue is easier to learn for beginners.', 5, 4),
('PostgreSQL is my go-to database.', 2, 6),
('Docker has made deployment so much easier.', 1, 10);

-- Insert nested comments
INSERT INTO comments (content, author_id, post_id, parent_comment_id) VALUES
('Apollo Client is excellent for React apps!', 1, 1, 3),
('I visited Tokyo, Kyoto, and Osaka.', 2, 2, 4),
('Agreed! The learning curve is much gentler.', 3, 4, 8);

-- Insert sample likes
INSERT INTO likes (user_id, post_id) VALUES
(2, 1), (3, 1), (4, 1), (5, 1),    -- Multiple likes on GraphQL post
(1, 2), (3, 2), (4, 2),            -- Likes on Japan post
(1, 3), (2, 3), (5, 3),            -- Likes on pizza post
(2, 4), (3, 4), (4, 4), (5, 4),    -- Likes on React post
(1, 5), (2, 5), (3, 5),            -- Likes on hiking post
(2, 6), (3, 6), (4, 6), (5, 6),    -- Likes on PostgreSQL post
(1, 7), (3, 7), (4, 7), (5, 7),    -- Likes on pasta post
(1, 8), (2, 8), (3, 8), (4, 8),    -- Likes on World Cup post
(1, 9), (2, 9), (3, 9), (5, 9),    -- Likes on jazz post
(1, 10), (2, 10), (4, 10), (5, 10); -- Likes on Docker post

-- Create indexes for better performance
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);

-- Create a view for post statistics
CREATE VIEW post_stats AS
SELECT 
    p.id,
    p.title,
    p.published,
    u.username as author,
    COUNT(DISTINCT c.id) as comment_count,
    COUNT(DISTINCT l.id) as like_count,
    COUNT(DISTINCT pc.category_id) as category_count,
    COUNT(DISTINCT pt.tag_id) as tag_count
FROM posts p
LEFT JOIN users u ON p.author_id = u.id
LEFT JOIN comments c ON p.id = c.post_id
LEFT JOIN likes l ON p.id = l.post_id
LEFT JOIN post_categories pc ON p.id = pc.post_id
LEFT JOIN post_tags pt ON p.id = pt.post_id
GROUP BY p.id, p.title, p.published, u.username;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 