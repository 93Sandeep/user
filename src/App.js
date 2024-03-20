import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './Pages/UserList';
import UserDetails from './Pages/UserDetails';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Router>
   <Routes>
  <Route path="/user/:id" element={<UserDetails users={users} />} />
  <Route path="/user" element={<UserList users={users} />} />
  <Route path="/" element={<UserList users={users} />} />
</Routes>
    </Router>
  );
};

export default App;
