import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date.js'; 

const DashboardPage = () => {
  const {user, logout} = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div 
      inital={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0.9}}
      transition={{duration: 0.5}}
    >
      <h2> Dashboard </h2>
      <div>
        <motion.div
          inital={{opacity: 0, y: 20 }}
          animate = {{ opacity: 1, y: 0}}
          transition={{delay: 0.4}}
        >
          <h3>Account Activity</h3>
          <p>
            <span>Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US",{
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <span className='font-bold'>Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{opacity:0, y:20}}
        animate={{opacity: 1, y:0}}
        transition={{delay: 0.6}}
      >
        <motion.button
          whileHover = {{scale: 1.05}}
          whileTap={{ sclae: 0.95}}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>

  )
};

export default DashboardPage;