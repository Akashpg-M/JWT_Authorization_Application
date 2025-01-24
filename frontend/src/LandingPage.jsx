import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white p-6">
			<h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
				🚀 Welcome to FastMed
			</h1>
			<p className="text-lg text-center max-w-2xl mb-8">
				FastMed is a smart and efficient healthcare management system that allows users
				to search hospitals, book appointments, order medicines, and chat with AI-powered medical assistants.
			</p>

			<Link
				to="/auth"
				className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg shadow-lg transition duration-300"
			>
				Go to Auth Dashboard
			</Link>
		</div>
	);
};

export default LandingPage;
