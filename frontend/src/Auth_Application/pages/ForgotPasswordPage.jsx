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
      className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6"
    >
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Forgot Password</h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-300 mb-4">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all w-full"
            >
              {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div>
              <Mail className="h-8 w-8 text-red-500 mx-auto" />
            </motion.div>
            <p className="text-gray-300 mt-4">
              If an account exists for {email}, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center mt-6 rounded-lg">
        <Link to={"/login"} className="flex items-center text-red-400 hover:text-red-500 transition">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
