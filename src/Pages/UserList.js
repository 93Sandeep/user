import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../CSS/UserList.css';

const UserList = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const maxPagesToShow = 5;

    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortConfig.key !== null) {
        
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
          return 0;
          
      }
      return 0; 
  });
    

  const totalPages = Math.ceil(sortedUsers.length / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => setCurrentPage(i)} disabled={currentPage === i}>
          {i}
        </button>
      );
    }
    return pages;
  };

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = e => {
      setCurrentPage(1);
  };

  return (
    <div className='userlists'>
      <h2>Users</h2>
      <div className='inputsearch'>
    <input
       className='onlyinputsection'
       type="text"
       placeholder="Search by first name"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       onKeyDown={handleSearch}
       />
      <button className='searchbtn' onClick={handleSearch}>
      <FontAwesomeIcon icon={faSearch} />
      </button>
      </div>
      <table>
        <thead className='headers'>
          <tr>
            <th onClick={() => handleSort('first_name')}>First Name <FontAwesomeIcon icon={faSort} style={{ marginLeft: '5px' }} /></th>
            <th onClick={() => handleSort('last_name')}>Last Name <FontAwesomeIcon icon={faSort} style={{ marginLeft: '5px' }} /></th>
            <th onClick={() => handleSort('age')}>Age <FontAwesomeIcon icon={faSort} style={{ marginLeft: '5px' }} /></th>
            <th onClick={() => handleSort('email')}>Email <FontAwesomeIcon icon={faSort} style={{ marginLeft: '5px' }} /></th>
            <th onClick={() => handleSort('web')}>Website <FontAwesomeIcon icon={faSort} style={{ marginLeft: '5px' }} /></th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map(user => (
              <tr key={user.id}>
                <td><Link className='firstname' to={`/user/${user.id}`}>{user.first_name}</Link></td> 
                <td>{user.last_name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td><a href={user.web} target="_blank" rel="noopener noreferrer">{user.web}</a></td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', paddingRight: '15px', gap: '6px' }}>
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        {getPageNumbers()}
        <button
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default UserList;
