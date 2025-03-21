// import {useState} from "react";
// import { motion } from "framer-motion";
// import { Mail, Lock, Loader} from "lucide-react";
// import { Link } from "react-router-dom";
// import Input from "../components/Input";
// import { useAuthStore } from "../store/authStore";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { login, isLoading, error } = useAuthStore();
  
//   const handleLogin = async(e) => {
//     e.preventDefault();
//     await login(email, password);
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
//     >
//       <div className = 'p-8'>
//         <h2>
//           Welcome Back
//         </h2>

//         <form onSubmit = {handleLogin}>
//           <Input
//             icon={Mail}
//             type='email'
//             placeholder='email Address'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <Input    
//             icon={Lock}
//             type='password'
//             placeholder='Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <div>
//             <Link to='/forgot-password'>
//               Forgot password?
//             </Link>
//           </div>

//           {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

//           <motion.button
//             whileHover={{scale: 1.02 }}
//             whileTap={{scale: 0.98}}
//             type='submit'
//             disabled={isLoading}
//           >

//             {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
//           </motion.button>
//         </form>
//       </div>

//       <div>
//         <p>
//           Dont have an account?{" "}
//           <Link to="/signup">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   )
// }


// export default LoginPage;

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 text-black"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Input    
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-300 hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 font-semibold mb-2 text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-300 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
