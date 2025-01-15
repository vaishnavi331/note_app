// import Signup from "./pages/signup"
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from "./pages/Home";
// import Login from './pages/Login'; // Assuming you have a Login page

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home/>}></Route>
//         <Route path="/signup" element={<Signup />} />   
//         <Route path="/login" element={<Login />} />
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/Login"; // Assuming you have a Login page
import { useAuth } from "./context/ContextProvider"; // Use authentication context

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Check if user is logged in
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Protect the Home route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
