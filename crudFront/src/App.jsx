import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import NewCustomer from './views/customers/NewCustomer';
import UpdateCustomer from './views/customers/UpdateCustomer';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer/new" element={<NewCustomer />} />
        <Route path="/customer/update" element={<UpdateCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
