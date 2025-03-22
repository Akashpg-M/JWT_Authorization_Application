// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuthStore } from '../store/authStore';

// import Input from "../components/Input";
// import toast from "react-hot-toast";
// import { Lock } from "lucide-react";


// const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const {resetPassword, error, isLoading, message} = useAuthStore();

//   const { token } = useParams(); //here the variable name should be same as the token variable name givem in route

//   const navigate = useNavigate();


//   console.log("Reset Token:", token); // Debugging token issue

//   const handleSubmit = async(e) => {
//     e.preventDefault();

//     if(password !== confirmPassword){
//       alert("Passwords do not match");
//       return;
//     }
//     try{
//       await resetPassword(token, password);

//       toast.success("Password reset successfull, redirecting to login page...");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
      
//     }catch(error) {
//       console.error(error);
//       toast.error(error.message || "Error resetting password");
//     }
//   };

//   return (
//     <motion.div
//       initial={{opacity: 0, y: 20}}
//       animate={{opacity: 1, y:0 }}
//       transition={{duration: 0.5}}
//       className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
//     >
//       <div className='p-8'>
//         <h2> Reset Password </h2>
//         {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
//         {message && <p>{message}</p>}

//         <form onSubmit={handleSubmit}>
//           <Input
//             icon={Lock}
//             type='password'
//             placeholder='New Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <Input
//             icon={Lock}
//             type='password'
//             placeholder='Confirm Password'
//             value={confirmPassword}
//             onChange={(e)=> setConfirmPassword(e.target.value)}
//           />

//           <motion.button
//             whileHover={{scale: 1.02}}
//             whileTap={{scale: 0.98}}
//             type='submit'
//             disabled={isLoading}
//           >
//             {isLoading ? "Resetting...": "Set New Password"}
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   )
// }

// export default ResetPasswordPage;


import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';

import Input from "../components/Input";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  console.log("Reset Token:", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);

      toast.success("Password reset successful, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6"
    >
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-6">Reset Password</h2>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        {message && <p className='text-green-400'>{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Lock}
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <Input
            icon={Lock}
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all w-full"
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
