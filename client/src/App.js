import logo from './logo.svg'; 
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route , Link } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
        <Navbar />
        <BrowserRouter>

        <Route path="/home" exact Component={HomePage} />

        </BrowserRouter>
    </div>
  );
}

export default App;