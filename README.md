![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with React](https://img.shields.io/badge/Runs%20with%20React-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=#3C823B)](https://legacy.reactjs.org/)
[![runs with React Router](https://img.shields.io/badge/Runs%20with%20React%20Router-000.svg?style=flat-square&logo=reactrouter&labelColor=f3f3f3&logoColor=#3C823B)](https://reactrouter.com/en/main)
[![runs with Storyblok](https://img.shields.io/badge/Runs%20with%20Story%20Book-000.svg?style=flat-square&logo=storyblok&labelColor=f3f3f3&logoColor=#3C823B)](https://www.storyblok.com/)
[![runs with MUI](https://img.shields.io/badge/Runs%20with%20MUI-000.svg?style=flat-square&logo=mui&labelColor=f3f3f3&logoColor=#3C823B)](https://mui.com/)
[![runs with Testing Library](https://img.shields.io/badge/Runs%20with%20React%20Testing%20Library-000.svg?style=flat-square&logo=testinglibrary&labelColor=f3f3f3&logoColor=#3C823B)](https://testing-library.com/)
[![runs with nodeJs](https://img.shields.io/badge/Runs%20with%20Node.Js-000.svg?style=flat-square&logo=nodedotjs&labelColor=f3f3f3&logoColor=#3C823B)](https://nodejs.org/ru)
[![runs with GraphQL](https://img.shields.io/badge/Runs%20with%20GraphQL-000.svg?style=flat-square&logo=graphql&labelColor=f3f3f3&logoColor=E10098)](https://graphql.org/)
[![runs with Apolo Server](https://img.shields.io/badge/Runs%20with%20Apolo%20Server-000.svg?style=flat-square&logo=apollographql&labelColor=f3f3f3&logoColor=311C87)](https://www.apollographql.com/docs)
[![Runs with Express](https://img.shields.io/badge/Runs%20with%20Express-000.svg?style=flat-square&logo=express&labelColor=f3f3f3&logoColor=000000)](https://expressjs.com/)
[![runs with Prisma](https://img.shields.io/badge/Runs%20with%20Prisma-000.svg?style=flat-square&logo=prisma&labelColor=f3f3f3&logoColor=2D3748)](https://www.prisma.io/)
[![Runs with MongoDB](https://img.shields.io/badge/Runs%20with%20MongoDB-000.svg?style=flat-square&logo=mongodb&labelColor=f3f3f3&logoColor=47A248)](https://www.mongodb.com/)
[![runs with JSON Web Tokens](https://img.shields.io/badge/Runs%20with%20JSON%20Web%20Tokens-000.svg?style=flat-square&logo=jsonwebtokens&labelColor=f3f3f3&logoColor=2D3748)](https://jwt.io/)

# Movie Recommender

**Project Description:**

Movie Recommender is a web application that allows users to explore information about movies, animated films, and TV shows. Key Features:

- Movie Information: Get detailed descriptions, trailers, actor lists, and expert reviews for each movie, show, or animation.
- Create Your Own Collection: Authorized users can create and manage their own favorite movie collections.
- Recommended Movie Lists: Users can generate personalized movie recommendation lists and share them via a unique link. Recipients can explore the movies in the list, watch trailers, view actors, and read expert reviews.

This app is perfect for movie enthusiasts who want to organize their collections and share recommendations with friends and family.

**Client Main Technologies:**

![Movie Recommender](/media/banner_client.jpg)

- React: React is a popular open-source JavaScript library for building user interfaces, particularly for single-page applications (SPAs). It allows developers to create reusable UI components, manage state efficiently, and build complex user interfaces with a declarative approach. React's component-based architecture and virtual DOM enhance performance by efficiently updating and rendering components when data changes.

- React Router DOM: React Router DOM is a routing library specifically for React applications, allowing navigation between different pages or views in a single-page application. It manages dynamic routing, enabling developers to map URL paths to specific components and create a seamless user experience with history-based navigation.

- Material-UI (MUI): Material-UI is a popular React component library that implements Google's Material Design guidelines. It provides pre-built, customizable UI components like buttons, forms, and layouts, which help developers quickly build responsive, visually appealing applications. MUI enhances the development process with a clean and consistent design language.

- Storybook: Storybook is an open-source tool for building and testing UI components in isolation from the main application. It allows developers to create and showcase different UI component states, document their usage, and test their behavior, improving component reusability and collaboration across development teams.

- Axios: Axios is a promise-based HTTP client for making requests from the browser or Node.js. It simplifies data fetching and interaction with REST APIs by providing a clean and consistent API for handling requests, responses, and errors. Axios also supports request/response interception, timeouts, and automatic JSON data transformation.

- Apollo Client: Apollo Client is a comprehensive state management library for GraphQL in JavaScript applications. It enables seamless data fetching and caching from GraphQL APIs, allowing developers to manage the local and remote application state in a declarative manner. Apollo Client integrates easily with React and enhances performance through automatic caching and query optimization.

- GraphQL: GraphQL is a query language for APIs and a runtime for executing those queries. It allows clients to request specific data and aggregate responses from multiple sources in a single request. This flexibility leads to more efficient and performant data retrieval compared to traditional REST APIs, making it easier to build dynamic user interfaces.

- React Testing Library: React Testing Library is a lightweight testing library focused on testing React components from a user's perspective. It encourages best practices by simulating real user interactions with components, ensuring that the application works as expected in different scenarios. It is often used for unit and integration testing in React applications.

- Framer Motion: Framer Motion is an animation library for React, providing simple and flexible APIs to create smooth, high-performance animations and transitions. It allows developers to build complex animations with ease, leveraging the power of React's declarative syntax and improving the user experience with visually engaging interactions.

## Client Technologies Used

    react
    react-router-dom
    graphql
    axios
    final-form
    framer-motion
    lodash.debounce
    testing-library
    storybook
    prop-types

**Server Main Technologies:**

![Movie Recommender](/media/banner_server.jpg)

- Apollo Server: Apollo Server is a community-driven, open-source GraphQL server that provides a flexible and powerful API for building GraphQL-based applications. It enables the creation and management of a GraphQL schema and handles query execution, making it a central component for implementing the server's data handling logic.

- Express: Express is a fast, minimalist web framework for Node.js used to build web applications and APIs. It simplifies the process of managing routes, handling HTTP requests, and implementing middleware, providing developers with an efficient way to build scalable and maintainable server-side applications. Express is highly flexible, allowing for customization, and is widely used in building RESTful APIs and single-page applications (SPAs).

- Prisma: Prisma is used as an ORM (Object-Relational Mapping) tool to interact with the database. It simplifies database access by providing a type-safe query interface and migration capabilities, making data management more efficient and reliable.

- MongoDB: MongoDB is a flexible, NoSQL database that stores data in a JSON-like format (BSON). It is designed for scalability and high performance, making it well-suited for handling large datasets, distributed applications, and cloud-based systems. MongoDB supports dynamic schema design, allowing for the easy storage of complex and changing data structures without the need for predefined tables or schemas, offering great flexibility in development.

- bcryptjs: bcryptjs is used for hashing passwords securely. It ensures that user passwords are stored in a hashed format, adding a layer of security to the authentication process by protecting against unauthorized access.

- dotenv: dotenv is used to manage environment variables. It loads environment-specific configurations from a .env file into process.env, allowing for secure and flexible management of sensitive information such as API keys and database credentials.

- graphql: GraphQL is a query language for APIs and a runtime for executing those queries by providing a flexible and efficient approach to data retrieval. It allows clients to request exactly the data they need and nothing more, enhancing the efficiency and performance of API interactions.

- graphql-middleware: graphql-middleware is used to apply middleware functions to GraphQL resolvers. It enables additional functionality such as logging, authentication, and authorization by intercepting and processing requests before they reach the resolvers.

- jsonwebtoken: jsonwebtoken is used for creating and verifying JSON Web Tokens (JWTs) for authentication and authorization. It ensures secure communication between the client and server by issuing and validating tokens that manage user sessions and access control.

## Server Technologies Used

    prisma
    apollo-server
    express
    mongoDB
    bcryptjs
    dotenv
    graphql
    graphql-middleware
    jsonwebtoken
    nodemon

## Server Project structure

```sh

server/prisma
  └── schema.prisma          # Prisma schema file

server/public
  └── .gitkeep

server/src
  ├── index.js               # Entry point of the application (local)
  ├── vercel_server.js       # Entry point of the application (Vercel)
  ├── resolvers              # GraphQL resolvers
  │   ├── Mutation.js
  │   └── Query.js
  ├── resolvers
  │   └── axios
  │       └── index.js       # Axios Instance
  ├── schema.graphql         # GraphQL schema definition
  └── utils                  # Utility functions

server/env
  ├── .env                   # Environment variables (should be ignored by git)
  └── .env.example           # Example environment file (template for configuration)

server/.gitignore                  # Specifies which files to ignore in git
server/package.json                # Project metadata and dependencies



```

## How to install (Server)

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/Solod-S/movie_recommender ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject/server
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## How to build your own..

1. First install all dependencies with npm or yarn:

```javascript
npm install
```

or

```javascript
yarn;
```

2. Initialize Prisma: Set up Prisma for your database.

```javascript
  npx prisma init
  npx prisma generate
  npx prisma db push
```

3.1 Exemple of server `.env` file. Replace values with yours!!

```javascript
TMDB_TOKEN;
THDB_API_KEY;
IMAGE_BASE_PATH;
PORT;
VERCEL_SERVER_URL;
APP_SECRET;
DATABASE_URL;
JWT_ACCESS_EXPIRATION;
JWT_REFRESH_EXPIRATION;
```

3.2 Exemple of client `.env` file. Replace values with yours!!

```javascript
REACT_APP_TMDB_API_KEY;
REACT_APP_TMDB_READ_ACCESS_TOKEN;
REACT_APP_SERVER_URL;
REACT_APP_PRODUCT_SERVER_URL;
REACT_APP_CLIENT_URL_DEV;
```

4. Start the server

```javascript
npx nodemon src/index
```

6. Enjoy!!

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request. For major changes, please open an issue first to discuss the changes.

**_NOTE: PLEASE LET ME KNOW IF YOU DISCOVERED ANY BUG OR YOU HAVE ANY SUGGESTIONS_**
