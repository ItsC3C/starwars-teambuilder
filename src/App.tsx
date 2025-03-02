import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Layout from "./components/Layout";
import { TeamProvider } from "./context/TeamContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <TeamProvider>
      {" "}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/character/:id" element={<DetailPage />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </TeamProvider>
  );
};

export default App;
