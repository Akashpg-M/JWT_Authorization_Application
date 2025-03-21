import { Navigate, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from './components/LoadingSpinner';

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to = '/login' replace />;
  }

  if(!user.isVerified){
    return <Navigate to='/verify-email' replace />;
  }

  return children;
}

//redirect Authenticated user
const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to='/' replace />;
  }

  return children; // children = current page
}


function App() {
  console.log("App loaded");

  const {isCheckingAuth, checkAuth , isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  
  if(isCheckingAuth) return <LoadingSpinner />


  console.log("IsAuthenticated: ", isAuthenticated);
  console.log("user; ", user);

  return (
    <>
    <div>
      <h1 className = 'text-red-500 text-5xl'> Hello World </h1>
      <Routes>

        <Route 
          path='/' 
          element = {
            <ProtectedRoute>
              <DashboardPage/>
            </ProtectedRoute>
          }
        />

        <Route 
          path = '/signup' 
          element = {
          <RedirectAuthenticatedUser>
            <SignUpPage/>
          </RedirectAuthenticatedUser>
          }
        />

        <Route 
          path = '/login' 
          element = {
          <RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>
          } 
        />

        <Route  
          path = '/verify-email' 
          element= {
              <EmailVerificationPage />
          } 
        />

        <Route
          path = '/forgot-password'
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path='reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage/>
            </RedirectAuthenticatedUser>
          }
        />

        <Route 
          path='*' 
          element={<Navigate to='/' replace />} 
        />

      </Routes>
      <Toaster/>
    </div>
      
    </>
  )
}

export default App


// import { Navigate, Route, Routes } from "react-router-dom";

// import SignUpPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LoginPage";
// import EmailVerificationPage from "./pages/EmailVerificationPage";
// import DashboardPage from "./pages/DashboardPage";

// import LoadingSpinner from "./components/LoadingSpinner";

// import { Toaster } from "react-hot-toast";
// import { useAuthStore } from "./store/authStore";
// import { useEffect } from "react";

// // protect routes that require authentication
// const ProtectedRoute = ({ children }) => {
// 	const { isAuthenticated, user } = useAuthStore();

// 	if (!isAuthenticated) {
// 		return <Navigate to='/login' replace />;
// 	}

// 	if (!user.isVerified) {
// 		return <Navigate to='/verify-email' replace />;
// 	}

// 	return children;
// };

// // redirect authenticated users to the home page
// const RedirectAuthenticatedUser = ({ children }) => {
// 	const { isAuthenticated, user } = useAuthStore();

// 	if (isAuthenticated && user.isVerified) {
// 		return <Navigate to='/' replace />;
// 	}

// 	return children;
// };

// function App() {
// 	const { isCheckingAuth, checkAuth } = useAuthStore();

// 	useEffect(() => {
// 		checkAuth();
// 	}, [checkAuth]);

// 	if (isCheckingAuth) return <LoadingSpinner />;

// 	return (
// 		<div>
			
// 			<Routes>
// 				<Route
// 					path='/'
// 					element={
// 						<ProtectedRoute>
// 							<DashboardPage />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/signup'
// 					element={
// 						<RedirectAuthenticatedUser>
// 							<SignUpPage />
// 						</RedirectAuthenticatedUser>
// 					}
// 				/>
// 				<Route
// 					path='/login'
// 					element={
// 						<RedirectAuthenticatedUser>
// 							<LoginPage />
// 						</RedirectAuthenticatedUser>
// 					}
// 				/>
// 				<Route path='/verify-email' element={<EmailVerificationPage />} />
				
// 			</Routes>
// 			<Toaster />
// 		</div>
// 	);
// }

// export default App;