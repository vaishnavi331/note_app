// import React from 'react';
// import{Link} from "react-router-dom";
// import {useAuth} from "../context/ContextProvider";
// import "./css/Navbar.css"

// const Navbar = ({setQuery}) => {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const { user, logout } = useAuth(); // Destructure user and logout from context

//   const handleLogout = () => {
//     logout(); // Call the logout function from the context
//     navigate("/login"); // Redirect to home or login page after logout
//   };
//   return (
//     <nav className='navbar p-4 text-white flex justify-between items-center'>
//         <div className='noteapp text-xl font-bold' > 
//             <Link to="/">NoteApp</Link>
//         </div>
//         <input
//           type="text"
//           placeholder='Search notes...'
//           className='searchbar px-4 py-2 rounded'
//           onChange={(e)=>setQuery(e.target.value)}
//           />
//           <div>
           
//             {!user?(
//                 <>      
//             <Link to="/login" className='bg-blue-500 px-4 py-2 rounded mr-4'>
//             Login
//             </Link>
//             <Link to="/signup" className='bg-green-500 px-4 py-2 rounded mr-4'>
//             Signup
//             </Link>
//                 </>
//             ):(
//               <>
//                <span className='username mr-4'>{user.name}</span>
//                <button className='logoutbutton px-4 py-2 rounded' onClick={handleLogout}>
//                 Logout </button> 
//               </>

//             )}  
//           </div>
//     </nav> 
//   );
// };
// export default Navbar



import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import "./css/Navbar.css";

const Navbar = ({ setQuery }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <nav className="navbar p-4 text-white flex justify-between items-center">
      <div className="noteapp text-xl font-bold">
        <Link to="/">NoteApp</Link>
      </div>
      {user && (
        <input
          type="text"
          placeholder="Search notes..."
          className="searchbar px-4 py-2 rounded"
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded mr-4">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="username mr-4">{user.name}</span>
            <button
              className="logoutbutton bg-red-500 px-4 py-2 rounded text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
