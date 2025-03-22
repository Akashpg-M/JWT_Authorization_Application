import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div>
      {/*simple loading spinner*/}
      <motion.div 
        className='w-16 h-16 border-4 border-t-4 border-t-blue-500 border-blue-200 rounded-full'
        animate={{rotator: 360}}
        transition={{duration: 1, repete: Infinity, ease: "linear"}}
      />
    </div>
  );
};

export default LoadingSpinner;