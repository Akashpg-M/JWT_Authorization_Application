// import { motion } from 'framer-motion';
// import { useAuthStore } from '../store/authStore.js';
// import { formatDate } from '../utils/date.js'; 

// const DashboardPage = () => {
//   const {user, logout} = useAuthStore();

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <motion.div 
//       inital={{opacity: 0, scale: 0.9}}
//       animate={{opacity: 1, scale: 1}}
//       exit={{opacity: 0, scale: 0.9}}
//       transition={{duration: 0.5}}
//     >
//       <h2> Dashboard </h2>
//       <div>
//         <motion.div
//           inital={{opacity: 0, y: 20 }}
//           animate = {{ opacity: 1, y: 0}}
//           transition={{delay: 0.4}}
//         >
//           <h3>Account Activity</h3>
//           <p>
//             <span>Joined: </span>
//             {new Date(user.createdAt).toLocaleDateString("en-US",{
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//           <p>
//             <span className='font-bold'>Last Login: </span>
//             {formatDate(user.lastLogin)}
//           </p>
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{opacity:0, y:20}}
//         animate={{opacity: 1, y:0}}
//         transition={{delay: 0.6}}
//       >
//         <motion.button
//           whileHover = {{scale: 1.05}}
//           whileTap={{ sclae: 0.95}}
//           onClick={handleLogout}
//         >
//           Logout
//         </motion.button>
//       </motion.div>
//     </motion.div>

//   )
// };

// export default DashboardPage;


import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore.js';
import { formatDate } from '../utils/date.js';

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6"
    >
      <h2 className="text-3xl font-bold text-white mb-4">Dashboard</h2>
      
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Activity</h3>
          <p className="text-sm text-gray-600 mb-1">
            <span>Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-bold">Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
