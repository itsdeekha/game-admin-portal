import { AuthProvider } from './auth/context';
import Router from './routes/sections';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
