import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore.js';
import { formatDate } from '../utils/date.js'; 

const DashboardPage = () => {
  const {user, logout} = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div 
      initial={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0.9}}
      transition={{duration: 0.5}}
      className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6"
    >
      <h2 className="text-4xl font-bold text-red-500 mb-6">Dashboard</h2>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <motion.div
          initial={{opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0}}
          transition={{delay: 0.4}}
        >
          <h3 className="text-2xl font-semibold text-red-400 mb-4">Account Activity</h3>
          <p className="text-gray-300">
            <span className="font-bold text-red-300">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US",{
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300 mt-2">
            <span className="font-bold text-red-300">Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{opacity:0, y:20}}
        animate={{opacity: 1, y:0}}
        transition={{delay: 0.6}}
        className="mt-6"
      >
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  )
};

export default DashboardPage;
