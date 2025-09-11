import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Navigate to="/1" />} />

        <Route path="/:page" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
