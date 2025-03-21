// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuthStore } from '../store/authStore';
// import Input from "../components/Input";

// const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const {resetPassword, error, isLoading, message} = useAuthStore();

//   const { token } = useParams();
//   const navigate = useNavigate();

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
//             placeholder='New Password'
//             value={password}
//             onchange={(e)=> setConfirmPassword(e.target.value)}
//           />

//           <motion.button
//             whileHover={{scale: 1.02}}
//             whileTrap={{scale: 0.98}}
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
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from '../store/authStore';
import Input from "../components/Input";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);

      toast.success("Password reset successful, redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 text-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
