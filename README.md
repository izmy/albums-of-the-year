# Albums of the Year

This project consists of both client-side and server-side applications for the "Albums of the Year" voting app for musicserver.cz.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- Yarn

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/izmy/albums-of-the-year.git
  ```
2. Install the dependencies:
  ```sh
  yarn
  ```

### Running the Client Application

To start the development server, run:
```sh
yarn start
```

This will start the application on `http://localhost:3000`.

### Building the Client Application

To create a production build, run:
```sh
  yarn build
```

The build output will be located in the `build` directory.

## Server

### Installation

1. Navigate to the server directory:
  ```sh
  cd albums-of-the-year/server
  ```
2. Install the dependencies:
  ```sh
  yarn install
  ```

### Running the Server

To start the server in development mode:
```sh
  yarn dev
```

This will start the application on `http://localhost:8000`.

To build and start the server in production mode:
```sh
  yarn build
  yarn start
```

### Environment Variables

Create a `.env` file in the root of the server directory and add the necessary environment variables. Example:
```
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/albums
  JWT_SECRET=your_jwt_secret
```

## Deployment

To deploy the application using Fly.io, follow these steps:

1. Install the Fly CLI:
  ```sh
  curl -L https://fly.io/install.sh | sh
  ```
2. Authenticate with Fly.io:
  ```sh
  fly auth login
  ```
3. Initialize the Fly.io configuration:
  ```sh
  fly launch
  ```
4. Deploy the application:
  ```sh
  fly deploy
  ```

## Project Structure

- `client/src/` - Contains the source code of the client application
- `client/public/` - Contains the public assets for the client
- `server/src/` - Contains the source code of the server application

## Dependencies

This project uses the following main dependencies:

- React
- Material-UI
- Axios
- React Router
- Express
- Mongoose

For a complete list of dependencies, refer to the `package.json` files in both the client and server directories.

## License

This project is licensed under the MIT License.

## Author

Jaroslav Hrách - [me@jaroslavhrach.cz](mailto:me@jaroslavhrach.cz)