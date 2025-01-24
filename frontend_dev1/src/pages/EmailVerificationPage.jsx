import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EmailVerificationPage = () => {
  const [code, setCode]= useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const isLoading = false;

  //automatically move to the next field when a field is entered
  const handleChange = ( index, value ) => {
    const newCode = [...code];

    //Handel pasted content
    if(value.length > 1){
      const pastedCode = value.slice(0, 6).split("");
      for(let i=0; i<6; i++){
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      //focus on the Lastnon-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    }else{
      newCode[index] = value;
      setCode(newCode);

      //Move focus to next input field if value is entered
      if(value && index < 5){
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handelKeyDown = ( index, e ) => {
    if(e.key === "Backspace" && !code[index] && index > 0){
      inputRefs.current[index-1].focus();
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log(`Verification code submitted: ${verificationCode}`);
  }
  
  //Auto submit when all fields are filled
  useEffect(() => {
    if(code.every(digit => digit !== '')) {
      handelSubmit(new Event('submit'));
    }
  },[code]);

  return (
    <div>
      <motion.div>
        <h2> verify your Email</h2>
        <p>Enter the 6-digit code sent to your email address</p>

        <form onSubmit={handelSubmit}>
          <div>
            {code.map((digit, index) => (
              <input
                key = {index}
                ref = {(el) => (inputRefs.current[index] = el)}
                type='text'
                maxLength='6'
                value={digit}
                onChange ={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handelKeyDown(index, e)}
              />
            ))}
          </div>

          <motion.button
            whileHover = {{ scale: 1.05 }}
            whileTap = {{ scale: 0.95 }}
            type='submit'
            disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading ? "Verifing..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default EmailVerificationPage;