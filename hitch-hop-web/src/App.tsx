import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileSettings from './pages/main/ProfileSettings';
import UsersManagement from './pages/main/UsersManagement';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/users-management" element={<UsersManagement />} />
        <Route path="/" element={<div>Aquí irá el contenido de la pantalla principal</div>} />
      </Routes>
    </Router>
  );
}

export default App