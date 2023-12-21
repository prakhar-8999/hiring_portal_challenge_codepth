import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// console.log(app);

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/login" index element={<Login />} />
      <Route path="/dashboard" index element={<Dashboard />} />
    </Routes>
  );
}

export default App;
