import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalCtx from "./Components/GlobalCTX.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <GlobalCtx>
          <App/>
      </GlobalCtx>
  </React.StrictMode>,
)
