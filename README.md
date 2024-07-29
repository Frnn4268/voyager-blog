# Voyager Blog

Voyager Blog is a web application designed to provide a platform for users to share and read blog posts. This project is built using React for the frontend and a RESTful API for the backend.

## Features

- User authentication and authorization
- Create, read and update blog posts
- View top users and their posts
- Responsive design

## Technologies Used

- React
- Material-UI
- Notistack for notifications
- RESTful API
- Node.js (for backend)
- Express (for backend)
- MongoDB (for database)

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
	>    git clone https://github.com/Frnn4268/voyager-blog.git

2. Navigate to the project directory (Backend):
	> cd .\api\
	> npm install

3. Navigate to the project directory (Backend):
	> cd .\client\
	> npm install

### Running the Application
1. Start the backend server:
2. Start the frontend development server:

#### Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

1. Backend:
   
`PORT=<your_port>`

`MONGODB_URI=<your_mongo_url`

`JWT_SECRET=<your_secret>`

3. Frontend:
   
`REACT_APP_API_URL=<your_api_url>`

`REACT_APP_API_UPLOAD=<your_api_url>`

Replace `<your_api_url>` with the URL of your backend API.

### Usage
- Register or log in to your account.
- Create new blog posts or edit your existing posts.
- View posts from other users.
- Check out the top users on the platform.
