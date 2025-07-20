(todo o cenário base foi gerado c/ ajuda de IA)


# GraphQL Playground Database

This project provides a PostgreSQL database setup for practicing GraphQL with Docker Compose. It includes a comprehensive schema with sample data that covers common GraphQL patterns like relationships, nested queries, and mutations.

## 🚀 Quick Start

1. **Start the database:**
   ```bash
   docker-compose up -d
   ```

2. **Check if the database is running:**
   ```bash
   docker-compose ps
   ```

3. **Connect to the database:**
   ```bash
   # Using psql (if you have PostgreSQL client installed)
   psql -h localhost -p 1395 -U graphql_user -d graphql_playground
   
   # Or connect via Docker
   docker exec -it graphql_postgres psql -U graphql_user -d graphql_playground
   ```

## 📊 Database Schema

The database includes the following tables with realistic relationships:

### Core Tables
- **`users`** - User accounts with basic profile information
- **`posts`** - Blog posts/articles with content and metadata
- **`comments`** - Comments on posts (supports nested comments)
- **`categories`** - Post categories (Technology, Travel, Food, etc.)
- **`tags`** - Post tags for better organization
- **`likes`** - User likes on posts

### Junction Tables
- **`post_categories`** - Many-to-many relationship between posts and categories
- **`post_tags`** - Many-to-many relationship between posts and tags

### Views
- **`post_stats`** - Aggregated statistics for posts (comment count, like count, etc.)

## 🔗 Sample Data

The database comes pre-populated with:

- **5 users** with different usernames and profiles
- **10 posts** across various categories (Technology, Travel, Food, Sports, Music)
- **10 categories** covering different topics
- **10 tags** for post organization
- **13 comments** including nested replies
- **Multiple likes** on posts
- **Relationships** between all entities

## 🛠️ Database Connection Details

- **Host:** `localhost`
- **Port:** `1395`
- **Database:** `graphql_playground`
- **Username:** `graphql_user`
- **Password:** `graphql_password`

## 📝 GraphQL Practice Scenarios

This database setup is perfect for practicing:

### Queries
- Fetch users with their posts
- Get posts with author information
- Retrieve posts by category or tag
- Query comments with nested replies
- Aggregate data (like counts, comment counts)

### Mutations
- Create new users, posts, comments
- Update existing records
- Delete posts and related data
- Like/unlike posts

### Advanced Features
- Pagination
- Filtering by multiple criteria
- Sorting by different fields
- Search functionality
- Real-time subscriptions (if using GraphQL subscriptions)

## 🧹 Management Commands

```bash
# Start the database
docker-compose up -d

# Stop the database
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v

# View logs
docker-compose logs postgres

# Restart the database
docker-compose restart postgres

# Reset the database (stop, remove volumes, start fresh)
docker-compose down -v && docker-compose up -d
```

## 🔧 Customization

### Adding More Data
You can modify the `init.sql` file to:
- Add more users, posts, or comments
- Create additional categories or tags
- Modify the schema structure

### Environment Variables
You can customize the database setup by modifying the environment variables in `docker-compose.yml`:
- `POSTGRES_DB` - Database name
- `POSTGRES_USER` - Username
- `POSTGRES_PASSWORD` - Password

## 🐛 Troubleshooting

### Port Already in Use
If port 1395 is already in use, modify the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "1396:5432"  # Use port 1396 instead
```

### Permission Issues
If you encounter permission issues, ensure Docker has the necessary permissions to create volumes and access the files.

### Database Not Starting
Check the logs for any errors:
```bash
docker-compose logs postgres
```

## 📚 Next Steps

Once your database is running, you can:

1. **Set up a GraphQL server** (Node.js/Express, Python/FastAPI, etc.)
2. **Create GraphQL resolvers** for each table
3. **Implement queries and mutations**
4. **Add authentication and authorization**
5. **Build a frontend** to interact with your GraphQL API

## 🤝 Contributing

Feel free to enhance this setup by:
- Adding more sample data
- Creating additional database views
- Improving the schema design
- Adding more complex relationships

Happy GraphQL coding! 🎉 
