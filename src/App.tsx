import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Tests from "./pages/Tests";
import Test from "./pages/Test";

function App() {
    return (
        <>
            <Header />
            <Sidebar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/test/:testId" element={<Test />} />
            </Routes>
        </>
    );
}

export default App;
