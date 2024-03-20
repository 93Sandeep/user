import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../CSS/UserDetails.css';

const UserDetails = ({ users }) => {
  const { id } = useParams();
  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return <div><h2>User not found!</h2></div>;
  }

  const fullName = `${user.first_name} ${user.last_name}`;
    
  return (
    <div className='maindiv'>
      <div className='headingdiv'>
      <Link className='backarrow' to="/user"><FontAwesomeIcon icon={faArrowLeft} />{" "}</Link>
      <h2>Details: {fullName}</h2>
      </div>   
    <div className='userdetails'>
      <p>First Name: {user.first_name}</p>
      <hr className='hrline'/>
      <p>Last Name: {user.last_name}</p>
      <hr className='hrline'/>
      <p>Company: {user.company_name}</p>
      <hr className='hrline'/>
      <p>City: {user.city}</p>
      <hr className='hrline'/>
      <p>State: {user.state}</p>
      <hr className='hrline'/>
      <p>Zip: {user.zip}</p> 
      <hr className='hrline'/>
      <p>Email: {user.email}</p>
      <hr className='hrline'/>
      <p style={{color:"black"}}>Website: <a href={user.web} target="_blank" rel="noopener noreferrer">{user.web}</a></p>
      <hr className='hrline'/>
      <p>Age: {user.age}</p>
      </div>
    </div>
  );
};

export default UserDetails;
