import './App.css';
import GetData from './Component/GetData';
import { Route, Routes } from 'react-router-dom';
import SIngleProduct from './Component/SIngleProduct';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<GetData/>} />
      <Route path="/product/:id" element={<SIngleProduct/>} />
      </Routes>
    </div>
  );
}

export default App;
