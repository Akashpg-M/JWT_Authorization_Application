import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import Input from "../Auth_Application/components/Input";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {resetPassword, error, isLoading, message} = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }
    try{
      await resetPassword(token, password);

      toast.success("Password reset successfull, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }catch(error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y:0 }}
      transition={{duration: 0.5}}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2> Reset Password </h2>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type='password'
            placeholder='New Password'
            value={password}
            onchange={(e)=> setConfirmPassword(e.target.value)}
          />

          <motion.button
            whileHover={{scale: 1.02}}
            whileTrap={{scale: 0.98}}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? "Resetting...": "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage;