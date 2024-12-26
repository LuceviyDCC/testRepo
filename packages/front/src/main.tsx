import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US'

import './index.css'
import App from './App.tsx'

import "@/assets/style/common.less";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
