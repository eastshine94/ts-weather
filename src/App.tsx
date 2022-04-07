import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContextWrapper from 'context/GlobalContextWrapper';
import ReactQueryTest from 'pages/ReactQueryTest';
import Home from 'pages/Home';

function App() {
  return (
    <BrowserRouter>
      <GlobalContextWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="test" element={<ReactQueryTest />} />
        </Routes>
      </GlobalContextWrapper>
    </BrowserRouter>
  );
}

export default App;
