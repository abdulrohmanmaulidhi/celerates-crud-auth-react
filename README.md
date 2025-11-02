# CRUD Authentication React Application

A full-stack React application with user authentication (login/register) and CRUD (Create, Read, Update, Delete) operations for managing data. Built with modern React patterns and best practices.

---

## Backend Repository

[Backend Repository](https://github.com/abdulrohmanmaulidhi/celerates-crud-auth-express)

---

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Protected Routes**: Private routing for authenticated users only
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality
- **Responsive Design**: Mobile-friendly UI using Bootstrap
- **Modern React**: Built with React Router for navigation
- **API Integration**: Axios for HTTP requests and API communication

## 🛠️ Technologies Used

- **Frontend**: React 19, React Router v6
- **Styling**: Bootstrap 5, CSS
- **HTTP Client**: Axios
- **Authentication**: Client-side authentication with protected routes
- **Build Tool**: Create React App
- **Testing**: React Testing Library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn package manager

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crud-auth-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (if applicable)
   Create a `.env` file in the root directory and add your API endpoints:
   ```
   API_URL=http://localhost:5000/api
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description     | Default                   |
| -------- | --------------- | ------------------------- |
| API_URL  | Backend API URL | http://localhost:5000/api |

## ▶️ Running the Application

### Development Mode

```bash
# Start the development server
npm start

# The application will be available at http://localhost:3000
```

### Production Build

```bash
# Create a production build
npm run build

# The optimized build will be in the `build` folder
```

### Running Tests

```bash
# Run tests in watch mode
npm test
```

## 🧭 Project Structure

```
src/
├── api/                    # API configuration and endpoints
│   └── api.js              # Main API configuration
├── components/            # Reusable React components
│   ├── navbar.js          # Navigation component
│   └── private-route.js   # Protected route component
├── pages/                 # Application pages/views
│   ├── dashboard.js       # Main dashboard with CRUD operations
│   ├── login.js           # Login page
│   ├── register.js        # Registration page
│   └── not-found.js       # 404 error page
├── App.js                 # Main application routes
└── index.js               # Application entry point
```

## 🔐 Authentication Flow

1. **Registration**: New users can create an account
2. **Login**: Existing users authenticate to access the application
3. **Protected Routes**: Dashboard is accessible only to authenticated users
4. **Session Management**: Authentication state is managed throughout the session

## 📊 CRUD Operations

The application supports full CRUD operations on data entities:

- **Create**: Add new records via forms
- **Read**: View and list existing records
- **Update**: Modify existing records
- **Delete**: Remove records (with confirmation)

## 🧪 Testing

The application includes test configurations:

- Unit tests for components using React Testing Library
- Integration tests for authentication flows
- API integration tests

Run tests with:

```bash
npm test
```

## 🚀 Deployment

### To Netlify, Vercel, or similar platforms:

1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting platform

### To a web server:

1. Build the application: `npm run build`
2. Serve the `build` folder using your preferred web server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Issues and Bugs

If you encounter any issues, please open an issue in the repository with:

- A clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment information (OS, browser, version)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Celerates Assignment - CRUD Authentication React Application

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Bootstrap](https://getbootstrap.com/) - Frontend component library
- [Axios](https://github.com/axios/axios) - Promise based HTTP client
- [Create React App](https://create-react-app.dev/) - React application boilerplate
