import React from "react";
import Dashboard from "./pages/Dashboard";
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster />
      <Dashboard />
    </div>
  );
}

export default App;
