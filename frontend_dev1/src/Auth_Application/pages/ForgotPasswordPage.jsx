// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useAuthStore } from "../store/authStore";
// import Input from "../components/Input";
// import { ArrowLeft, Loader, Mail } from "lucide-react";
// import { Link } from "react-router-dom";

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const { isLoading, forgotPassword } = useAuthStore();

//   const handelSubmit = async (e) => {
//     e.preventDefault();
//     await forgotPassword(email);
//     setIsSubmitted(true);
//   };

//   return(
//     <motion.div
//       initial = {{ opacity:0, y: 20}}
//       animate ={{opacity: 1, y: 0}}
//       transition = {{ duration: 0.5}}
//       >
//         <div classname='p-8'>
//           <h2>
//             Forgot Password
//           </h2>

//           {!isSubmitted ? (
//             <form onSubmit={handelSubmit}>
//               <p classname='text-grey-300 mb-6 text-center'>
//                 Enter your emial and we'll send you a link to reset your password.
//               </p>

//               <Input
//                 icon={Mail}
//                 type='email'
//                 placeholder='Email Address'
//                 value={email}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 required
//               />

//               <motion.button>
//                 {isLoading ? <Loader classname='size-6 animate-spin mx-auto' /> : "send Reset Link"}
//               </motion.button>
//             </form>
//           ) : (
//             <div className='text-center'>
//               <motion.div>
//                 <Mail className='h-8 w-8 text-white'/>
//               </motion.div>

//               <p className='text-grey-300 mb-6'>
//                 If an account exits from {email}, you will receive a password reset link shortly.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
//           <Link to={"/login"}>
//             <ArrowLeft className='h-4 w-4 mr-2'/> Back to Login
//           </Link>
//         </div>
//       </motion.div>
//   )
// }

// export default ForgotPasswordPage;

import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-500 text-sm mb-4">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="h-6 w-6 animate-spin mx-auto" /> : "Send Reset Link"}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Mail className="h-10 w-10 text-blue-500 mx-auto mb-2" />
            </motion.div>

            <p className="text-gray-600 text-sm">
              If an account exists with <span className="font-medium text-gray-900">{email}</span>, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 flex justify-center w-full">
        <Link to="/login" className="flex items-center text-white hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
