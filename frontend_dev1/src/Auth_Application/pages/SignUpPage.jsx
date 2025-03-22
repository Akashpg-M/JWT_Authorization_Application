// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "../components/Input";
// import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
// import { Loader, User, Mail, Lock, Phone } from "lucide-react";
// import { useAuthStore } from "../store/authStore";

// const SignUpPage = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const navigate = useNavigate();
    
//     const { signup, error, isLoading } = useAuthStore();
//     const handleSignUp = async(e) => {
//         e.preventDefault();

//         try{
//           await signup(email, password, name, phone);
//           navigate("/verify-email");
//         }catch(error){
//           console.log(error)
//         }
//     }

//     return ( 
//         <motion.div>
//             <div className = 'p-8'>
//                 <h2>
//                     create Account
//                 </h2>

//                 <form onSubmit = {handleSignUp}>
//                     <Input
//                       icon={User}
//                       text = 'text'
//                       placeholder = 'Full Name'
//                       value = {name}
//                       onChange ={ (e) => setName(e.target.value)}
//                     />

//                     <Input
//                       icon={Mail}
//                       text = 'email'
//                       placeholder = 'Email Address'
//                       value = {email}
//                       onChange ={ (e) => setEmail(e.target.value)}
//                     />

//                     <Input
//                       icon={Lock}
//                       text = 'password'
//                       placeholder = 'Password'
//                       value = {password}
//                       onChange ={ (e) => setPassword(e.target.value)}
//                     />

//                     <Input
//                       icon={Phone}
//                       text="phone"
//                       placeholder="Phone Number"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                     />


//                     {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
//                     <PasswordStrengthMeter password={password} />

//                     <motion.button
//                       whileHover = {{ scale: 1.02 }}
//                       whileTap={{scale: 0.98}}
//                       type = 'submit'
//                       disabled={isLoading}
//                       >
//                         {isLoading ? <Loader className=' animate-spin mx-auto' size={24}/> : "Sign Up"}
//                     </motion.button>
//                 </form>
//             </div>
            
//             <div>
//                 <p>
//                     Already have an Account?{" "}
//                     <Link to={"/login"}>
//                       Login
//                     </Link>
//                 </p>  
//             </div>

//         </motion.div>
//     );
// };

// export default SignUpPage;


import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Loader, User, Mail, Lock, Phone } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    
    const { signup, error, isLoading } = useAuthStore();
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          await signup(email, password, name, phone);
          navigate("/verify-email");
        } catch (error) {
          console.log(error);
        }
    };

    return ( 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6 overflow-hidden">

        
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
                <h2 className="text-3xl font-bold text-red-500 mb-6">Create Account</h2>

                <form onSubmit={handleSignUp} className="space-y-4">
                    <Input
                      icon={User}
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

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

                    <Input
                      icon={Phone}
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    <PasswordStrengthMeter password={password} />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type='submit'
                      disabled={isLoading}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all w-full"
                    >
                        {isLoading ? <Loader className='animate-spin mx-auto' size={24}/> : "Sign Up"}
                    </motion.button>
                </form>
            </div>
            
            <div className="mt-6 text-center">
                <p className="text-gray-300">
                    Already have an account? {" "}
                    <Link to="/login" className="text-red-400 hover:text-red-500 transition">
                      Login
                    </Link>
                </p>  
            </div>
        </motion.div>
    );
};

export default SignUpPage;
