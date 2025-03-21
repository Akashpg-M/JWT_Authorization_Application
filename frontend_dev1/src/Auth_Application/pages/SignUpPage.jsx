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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 text-white"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Input
              icon={Phone}
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <PasswordStrengthMeter password={password} />

            {error && <p className="text-red-500 font-semibold text-center">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
            </motion.button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-300 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
};

export default SignUpPage;
