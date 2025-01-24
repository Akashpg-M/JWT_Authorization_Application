import  {Routes, Route} from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from "./pages/EmailVerificationPage";

function App() {
  console.log("App loaded");
  return (
    <>
    <div>
      <h1 className = 'text-red-500 text-5xl'> Hello World </h1>
      <Routes>
        <Route path='/' element = {"Home"} />
        <Route path = '/signup' element = {<SignUpPage/>}/>
        <Route path = '/login' element = {<LoginPage/>} />
        <Route path = '/verify-email' element= {<EmailVerificationPage />} />
      </Routes>
    </div>
      
    </>
  )
}

export default App

// import React from "react";

// function App() {
//   return <h1>Hello World</h1>;
// }

// export default App;
