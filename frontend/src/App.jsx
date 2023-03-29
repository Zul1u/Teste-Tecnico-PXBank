import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Employees from './pages/Employees';
import Provider from './contexts/Provider';

function App() {
  return (
    <Provider>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </main>
    </Provider>
  );
}

export default App;
