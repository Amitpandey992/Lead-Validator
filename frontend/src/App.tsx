import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckInbox from "./pages/Auth/CheckInbox";
import SourceManagement from "./pages/dashboard/SourceManagement";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import PublicRoute from "./components/PubilcRoute";
import Overview from "./pages/dashboard/Overview";
import Leads from "./pages/dashboard/Leads";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/check-inbox" element={<CheckInbox />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<Overview />} />
                            <Route path="leads" element={<Leads />} />
                            <Route
                                path="source-management"
                                element={<SourceManagement />}
                            />
                        </Route>
                    </Route>

                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>

                <ToastContainer position="bottom-center" theme="dark" />
            </AuthProvider>
        </Router>
    );
}

export default App;
