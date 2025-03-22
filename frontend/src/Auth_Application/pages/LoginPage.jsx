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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6"
    >
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <Input    
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <div className="text-right">
            <Link to='/forgot-password' className="text-red-400 hover:text-red-500 transition">
              Forgot password?
            </Link>
          </div>

          {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all w-full"
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
          </motion.button>
        </form>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-300">
          Don't have an account? {" "}
          <Link to="/signup" className="text-red-400 hover:text-red-500 transition">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
