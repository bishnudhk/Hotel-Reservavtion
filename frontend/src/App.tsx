import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./context/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

const App = () => {
  const { isLoggedIn } = useAppContext();

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
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>

        <Route
          path="/signIn"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        ></Route>
        {isLoggedIn && (
          <>
            <Route
              path="/addHotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            ></Route>

            <Route
              path="/myHotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            ></Route>

            <Route
              path="/edithotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            ></Route>

            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
            ></Route>
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
