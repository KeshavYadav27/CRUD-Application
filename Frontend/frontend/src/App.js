// import React from "react";
// import "./App.css";

// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// import { RequireToken } from "./components/Auth.js";
// import Login from "./components/Login.js";
// import Profile from "./components/Profile.js";
// import Signup from "./components/Signup.js";

// function App() {
//   return (
//     <div className="vh-100 gradient-custom">
//       <div className="container">
//         <h1 className="page-header text-center">Management App</h1>

//         <BrowserRouter>
//           <p>
//             <Link to="/" className="btn btn-success">
//               Login
//             </Link>{" "}
//             |{" "}
//             <Link to="/Signup" className="btn btn-success">
//               Signup
//             </Link>
//             {""}
//           </p>

//           <Routes>
//             <Route path="/Signup" element={<Signup />} />
//             <Route path="/" element={<Login />} />
//             <Route
//               path="/profile"
//               element={
//                 <RequireToken>
//                   <Profile />
//                 </RequireToken>
//               }
//             />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { RequireToken } from "./components/Auth.js";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";
import Signup from "./components/Signup.js";

function App() {
  // const navigate = useNavigate();
  useEffect(() => {
    console.log(window.location.pathname);
  }, [window.location.pathname]);
  // console.log(window.location.pathname);
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">Management App</h1>
        {/* Conditionally render BrowserRouter based on route */}
        {["/", "/Signup"].includes(window.location.pathname) && (
          <BrowserRouter>
            <p>
              <Link to="/" className="btn btn-success">
                Login
              </Link>{" "}
              |{" "}
              <Link to="/Signup" className="btn btn-success">
                Signup
              </Link>{" "}
            </p>

            <Routes>
              <Route path="/Signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <RequireToken>
                    <Profile />
                  </RequireToken>
                }
              />
            </Routes>
          </BrowserRouter>
        )}

        {/* Render the Login and Signup components without BrowserRouter */}
        {window.location.pathname === "/profile" && (
          <Routes>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/profile"
              element={
                <RequireToken>
                  <Profile />
                </RequireToken>
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
