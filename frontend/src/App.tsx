import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
