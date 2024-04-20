import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Job from "./pages/Job";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { HomeProvider } from "./hook/context";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import { DashboardProvider } from "./hook/dashboardContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <HomeProvider>
                <Home />
              </HomeProvider>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/job/:id" element={<Job />} />
          <Route
            path="/dashboard"
            element={
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </>
  );
}

export default App;
