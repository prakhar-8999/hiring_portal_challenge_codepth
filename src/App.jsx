import {Route, Routes} from "react-router-dom";
import ApplyForJob from "./pages/ApplyForJob";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/login" index element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="" element={<ApplyForJob />} />
      </Route>
    </Routes>
  );
};

export default App;
