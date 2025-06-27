import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainContainer from "./components/main-container";
import MainBoard from "./components/mainboard";
import Categories from "./components/categories";
import gamesData from "./data/games.json";
import categoriesData from "./data/categories.json";

const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));

const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.2rem',
    color: 'var(--dark)'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainContainer>
            <MainBoard rooms={gamesData} />
            <Categories categories={categoriesData} />
          </MainContainer>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Suspense fallback={<LoadingSpinner />}>
          <MainContainer>
            <Login />
          </MainContainer>
          </Suspense>
        }
      />
      <Route
        path="/sign-up"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <MainContainer>
              <Register />
            </MainContainer>
          </Suspense>
        }
      />
      {/* 404 route for better UX */}
      <Route
        path="*"
        element={
          <MainContainer>
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: 'var(--dark)'
            }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          </MainContainer>
        }
      />
    </Routes>
  );
}

export default App;
