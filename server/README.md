# Albums of the Year - server

This is the server component of the "Albums of the Year" application for musicserver.cz.

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
2. Navigate to the server directory:
  ```sh
  cd albums-of-the-year/server
  ```
3. Install the dependencies:
  ```sh
  yarn install
  ```

### Running the Server

To start the server in development mode:
```sh
yarn dev
```

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

## License

This project is licensed under the MIT License.

## Author

Jaroslav Hrách - [me@jaroslavhrach.cz](mailto:me@jaroslavhrach.cz)