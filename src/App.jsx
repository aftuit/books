import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
