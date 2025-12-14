import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
return (
// Router uygulamanın tamamını sarar
<Router>
<Routes>
{/* Login sayfası */}
<Route path="/" element={<Login />} />


{/* Register (Kayıt Ol) sayfası */}
<Route path="/register" element={<Register />} />
</Routes>
</Router>
);
}


export default App;