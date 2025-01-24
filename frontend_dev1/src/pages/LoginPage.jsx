import {useState} from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader} from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
// import { userAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { login, isLoading, error } = useAuthStore();
  const isLoading=true;
  
  const handleLogin = async(e) => {
    // e.preventDefault();
    // await login(email, password);
  }

  return (
    <motion.div>
      <div>
        <h2>
          Welcome Back
        </h2>

        <form onSubmit = {handleLogin}>
          <Input
            icon={Mail}
            type='email'
            placeholder='email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input    
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <Link to='/forgot-password'>
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{scale: 1.02 }}
            whileTap={{scale: 0.98}}
            type='submit'
            disabled={isLoading}
          >

            {isLoading ? <Loader /> : "Login"}
          </motion.button>
        </form>
      </div>

      <div>
        <p>
          Dont have an account?{" "}
          <Link to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}


export default LoginPage;