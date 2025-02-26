import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Pass the selected character and its Sith/Jedi status through location.state */}
          <Route path="/" element={<MainPage />} />
          <Route path="/character/:id" element={<DetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
