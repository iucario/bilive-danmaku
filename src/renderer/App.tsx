import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Danmaku from './components/Danmaku';
import './i18n';
import './app.global.scss';

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Danmaku />} />
      </Routes>
    </Router>
  );
}
