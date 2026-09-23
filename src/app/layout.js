import './globals.css';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

export const metadata = {
  title: 'PersonaHub',
  description: 'Persona Creation & Management SaaS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <TopNav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
