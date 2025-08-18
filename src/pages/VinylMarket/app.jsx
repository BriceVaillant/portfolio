import './VinylMarketHome.css';

import VinylMarketHome from './VinylMarketHome';
import { Routes, Route } from 'react-router-dom';


function VinylMarketApp() {
  return (
    <div id="VinylMarket">
      <Routes>
        <Route index element={<VinylMarketHome />} />
        <Route path="home" element={<VinylMarketHome />} />
      </Routes>
    </div>
  );
}

export default VinylMarketApp;