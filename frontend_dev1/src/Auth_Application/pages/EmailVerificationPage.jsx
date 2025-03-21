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
//     if(value.length > 1){
//       const pastedCode = value.slice(0, 6).split("");
//       for(let i=0; i<6; i++){
//         newCode[i] = pastedCode[i] || "";
//       }
//       setCode(newCode);

//       //focus on the Lastnon-empty input or the first empty one
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

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const focusIndex = newCode.findIndex((digit) => digit === "");
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
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
      toast.success("Email verified successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
        <p className="text-gray-600 text-sm mb-4">Enter the 6-digit code sent to your email address.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-medium mt-2">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
