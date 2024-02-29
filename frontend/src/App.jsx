import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeNovinar from "./pages/HomeNovinar";
import HomeUrednik from "./pages/HomeUrednik";
import NewsPage from "./pages/NewsPage";
import CreateNewsPage from "./pages/CreateNewsPage";
import Register from "./pages/Register";
import Archive from "./pages/Archive";
import NewsNovinar from "./pages/NewsNovinar";
import HomeGlavniUrednik from "./pages/HomeGlavniUrednik";
import AllUsers from "./pages/AllUsers";
import EditNews from "./pages/EditNews";
import NewsUrednik from "./pages/NewsUrednik";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Novinar/:id" element={<HomeNovinar />}></Route>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route exact path="/Urednik/:id" element={<HomeUrednik />}></Route>
          <Route
            exact
            path="/NewsNovinar/Edit/:id"
            element={<EditNews />}
          ></Route>
          <Route
            exact
            path="/GUrednik/:id"
            element={<HomeGlavniUrednik />}
          ></Route>
          <Route
            exact
            path="/GUrednik/:id/allUsers"
            element={<AllUsers />}
          ></Route>
          <Route exact path="/News/:id" element={<NewsPage />}></Route>
          <Route
            exact
            path="/Novinar/:id/CreateNews"
            element={<CreateNewsPage />}
          ></Route>
          <Route
            exact
            path="GUrednik/:id/Register"
            element={<Register />}
          ></Route>
          <Route exact path="/Archive" element={<Archive />}></Route>
          <Route
            exact
            path="/:id/NewsNovinar/:id"
            element={<NewsNovinar />}
          ></Route>
          <Route
            exact
            path="/:id/NewsUrednik/:id"
            element={<NewsUrednik />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
