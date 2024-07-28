import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import { UserContextProvider } from "./context/UserContext";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import TopUsersPage from "./pages/TopUsersPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/create" element={<CreatePostPage />}></Route>
          <Route path="/post/:id" element={<PostPage />}></Route>
          <Route path="/edit/:id" element={<EditPostPage />}></Route>
          <Route path="/top-users" element={<TopUsersPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
