// import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster/>
      <main className=''>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
