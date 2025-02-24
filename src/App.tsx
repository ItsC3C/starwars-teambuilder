import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CharacterDetail from "./components/DetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route path="/character/:id" element={<CharacterDetail />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
