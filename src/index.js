import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import PokedexContainer from './components/PokedexContainer.js';
import Footer from './components/Footer.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="container">
        <PokedexContainer />
        <Footer />
    </div>
);