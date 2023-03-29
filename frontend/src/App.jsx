import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Employees from './pages/Employees';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
}

export default App;
