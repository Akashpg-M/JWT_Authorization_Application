import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import AuthApp from "./AuthApp/AuthDashboard.jsx"; // Import Auth Dashboard

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/auth/*" element={<AuthApp />} />
			<Route path="*" element={<LandingPage />} />
		</Routes>
	);
}

export default App;
