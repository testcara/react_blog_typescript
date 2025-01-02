import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import UserTab from './components/UserTab';
import useUser from './hooks/useUser';

function App() {
  const {user } = useUser();
  return (
    <> 
    <UserTab  user={user || { username: 'Guest' }} />
    <Header></Header>
    <div className='inner'>
    </div>
    <Footer></Footer>
    </>
  );
}

export default App;
