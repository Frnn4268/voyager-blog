import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <main>
            <Header />
            <Post />
            <Post />
            <Post />
          </main>
        }
      />
      <Route
        path={"/login"}
        element={
          <main>
            <Header />
            <div>
              Login Page
            </div>
          </main>
        }
      ></Route>
    </Routes>
  );
}

export default App;
