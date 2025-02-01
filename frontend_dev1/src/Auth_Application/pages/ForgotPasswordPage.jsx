import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../Auth_Application/components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return(
    <motion.div
      initial = {{ opacity:0, y: 20}}
      animate ={{opacity: 1, y: 0}}
      transition = {{ duration: 0.5}}
      >
        <div classname='p-8'>
          <h2>
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handelSubmit}>
              <p classname='text-grey-300 mb-6 text-center'>
                Enter your emial and we'll send you a link to reset your password.
              </p>

              <Input
                icon={Mail}
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />

              <motion.button>
                {isLoading ? <Loader classname='size-6 animate-spin mx-auto' /> : "send Reset Link"}
              </motion.button>
            </form>
          ) : (
            <div className='text-center'>
              <motion.div>
                <Mail className='h-8 w-8 text-white'/>
              </motion.div>

              <p className='text-grey-300 mb-6'>
                If an account exits from {email}, you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
          <Link to={"/login"}>
            <ArrowLeft className='h-4 w-4 mr-2'/> Back to Login
          </Link>
        </div>
      </motion.div>
  )
}

export default ForgotPasswordPage;