import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Auth_Application/components/Input";
import PasswordStrengthMeter from "../Auth_Application/components/PasswordStrengthMeter";
import { Loader, User, Mail, Lock, Phone } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    
    const { signup, error, isLoading } = useAuthStore();
    const handleSignUp = async(e) => {
        e.preventDefault();

        try{
          await signup(email, password, name, phone);
          navigate("/verify-email");
        }catch(error){
          console.log(error)
        }
    }

    return ( 
        <motion.div>
            <div className = 'p-8'>
                <h2>
                    create Account
                </h2>

                <form onSubmit = {handleSignUp}>
                    <Input
                      icon={User}
                      text = 'text'
                      placeholder = 'Full Name'
                      value = {name}
                      onChange ={ (e) => setName(e.target.value)}
                    />

                    <Input
                      icon={Mail}
                      text = 'email'
                      placeholder = 'Email Address'
                      value = {email}
                      onChange ={ (e) => setEmail(e.target.value)}
                    />

                    <Input
                      icon={Lock}
                      text = 'password'
                      placeholder = 'Password'
                      value = {password}
                      onChange ={ (e) => setPassword(e.target.value)}
                    />

                    <Input
                      icon={Phone}
                      text="phone"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />


                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    <PasswordStrengthMeter password={password} />

                    <motion.button
                      whileHover = {{ scale: 1.02 }}
                      whileTap={{scale: 0.98}}
                      type = 'submit'
                      disabled={isLoading}
                      >
                        {isLoading ? <Loader className=' animate-spin mx-auto' size={24}/> : "Sign Up"}
                    </motion.button>
                </form>
            </div>
            
            <div>
                <p>
                    Already have an Account?{" "}
                    <Link to={"/login"}>
                      Login
                    </Link>
                </p>  
            </div>

        </motion.div>
    );
};

export default SignUpPage;