import {Route, Routes} from "react-router-dom";
import AddJobs from "./pages/AddJobs";
import AppliedJobs from "./pages/AppliedJobs";
import ApplyForJob from "./pages/ApplyForJob";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/login" index element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="" element={<Profile />} />
        <Route path="applyForJob" element={<ApplyForJob />} />
        <Route path="appliedJobs" element={<AppliedJobs />} />
        <Route path="addJobs" element={<AddJobs />} />
      </Route>
    </Routes>
  );
};

export default App;
