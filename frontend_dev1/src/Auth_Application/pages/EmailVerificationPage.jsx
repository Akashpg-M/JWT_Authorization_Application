// import { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuthStore } from "../store/authStore";
// import toast  from "react-hot-toast";

// const EmailVerificationPage = () => {
  
//   const [code, setCode]= useState(["", "", "", "", "", ""]);
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   const { error, isLoading, verifyEmail } = useAuthStore();

//   //automatically move to the next field when a field is entered
//   const handleChange = ( index, value ) => {
//     const newCode = [...code];

//     //Handel pasted content
//     if(value.length > 1){ //value denotes the
//       const pastedCode = value.slice(0, 6).split("");
//       for(let i=0; i<6; i++){
//         newCode[i] = pastedCode[i] || "";
//       }
//       setCode(newCode);

//       //focus on the Last non-empty input or the first empty one
//       const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
//       const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
//       inputRefs.current[focusIndex].focus();
//     }else{
//       newCode[index] = value;
//       setCode(newCode);

//       //Move focus to next input field if value is entered
//       if(value && index < 5){
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = ( index, e ) => {
//     if(e.key === "Backspace" && !code[index] && index > 0){
//       inputRefs.current[index-1]?.focus();
//     }
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const verificationCode = code.join("");
//     try{
//       await verifyEmail(verificationCode);
//       toast.success("email verified successfully");
//       navigate("/");
//     }catch(error){
//       console.log(error);
//     }
//     console.log(`Verification code submitted: ${verificationCode}`);
//   }
  
//   //Auto submit when all fields are filled
//   // useEffect(() => {
//   //   if(code.every(digit => digit !== '')) {
//   //     handleSubmit(new Event('submit'));
//   //   }
//   // },[code]);

//   return (
//     <div>
//       <motion.div>
//         <h2> verify your Email</h2>
//         <p>Enter the 6-digit code sent to your email address</p>

//         <form onSubmit={handleSubmit}>
//           <div>
//             {code.map((digit, index) => (
//               <input
//                 key = {index}
//                 ref = {(el) => (inputRefs.current[index] = el)}
//                 type='text'
//                 maxLength='6'
//                 value={digit}
//                 onChange ={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//               />
//             ))}
//           </div>
//           {error && <p className = 'text-red-500 font-semibold mt-2'>{error}</p>}
//           <motion.button
//             whileHover = {{ scale: 1.05 }}
//             whileTap = {{ scale: 0.95 }}
//             type='submit'
//             disabled={isLoading || code.some((digit) => !digit)}
//           >
//             {isLoading ? "Verifying..." : "Verify Email"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default EmailVerificationPage;


import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center"
      >
        <h2 className="text-3xl font-bold text-red-500 mb-4">Verify Your Email</h2>
        <p className="text-gray-300 mb-6">Enter the 6-digit code sent to your email address</p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                maxLength='1'
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-2xl text-center bg-gray-700 border border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ))}
          </div>
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={isLoading || code.some((digit) => !digit)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all w-full"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
