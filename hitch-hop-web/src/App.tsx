import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileSettings from './components/ProfileSettings';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/" element={<div>Aquí irá el contenido de la pantalla principal</div>} />
      </Routes>
    </Router>
  );
}

export default App