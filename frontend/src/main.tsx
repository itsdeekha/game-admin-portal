import './styles.css';

import ReactDOM from 'react-dom/client';
import App from './app';

const rootElement = document.getElementById('app');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<App />);
}
