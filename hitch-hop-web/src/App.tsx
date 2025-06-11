import './App.css'
import Router from './router/Router'
import {AuthProvider} from './Context/auth-context';


function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App