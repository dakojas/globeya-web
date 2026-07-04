import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nehnutelnosti/:slug" element={<PropertyDetail />} />
    </Routes>
  );
}
