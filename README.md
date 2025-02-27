# Movies List Application

This application allows you to poll movie data from an external API (OMDB) and store it in a local PostgreSQL database. It has a React frontend built with Next.js, a backend API built with Node.js, and server-side pagination with search functionality.

## Architecture Overview

![Architecture](https://your-architecture-image-url.com)

## Features

- **Movie Polling**: Fetch movie data from OMDB API and store it in the local database.
- **Pagination**: Navigate through the movie list with server-side pagination.
- **Search**: Search for movies by title, director, or plot.
- **Error Handling**: If polling or saving fails, the error is logged into the database.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **Docker** (for PostgreSQL and containerized environment)
- **npm** (for frontend and backend package management)

## Getting Started

Follow the steps below to get the application up and running.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/vivekkv178/mein-unterricht
cd mein-unterricht
```

### 2. Set Up Environment Variables

All the environment variables required are already pushed in the docker-compose.yml file.

Just add in an appropriate OMDB_API_KEY in the docker-compose.yml

**Note**: Passwords and sensitive information are included in the configuration files for ease of running the application. Please make sure to change them to more secure values before deploying or using in a production environment.

### 3. Set Up Docker

The project uses Docker to set up PostgreSQL. To set up Docker, follow these steps:

1. Ensure that Docker is running on your machine.
2. Build and start the containers:

```bash
docker-compose up --build
```

This will build the services (`frontend`, `backend`, `db`) and start them. The backend will connect to the PostgreSQL database and expose API endpoints, while the frontend will run on port `3000`.

### 4. Access the application

The frontend application will be available at `http://localhost:3000`.

### 5. Poll Movies

Once the application is running, click the **Poll Movies** button in the UI to start polling movie data. This will trigger the backend to fetch movie data from the OMDB API and store it in the PostgreSQL database.

**Note**: If Polling the data fails, retry polling data a few times

### 6. Access the Movies List

The **Movies List** table will display all the movies that have been successfully fetched. You can filter the movies by title, plot, or director using the search functionality. You can also navigate through the movie list using the pagination controls.

### 7. Error Handling

If there are any errors during polling or database insertion, the errors will be logged into the database and can be viewed as needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: Be sure to replace `https://your-architecture-image-url.com` with the actual URL where your architecture diagram image is hosted.

Let me know if you'd like to make further changes to the README!
