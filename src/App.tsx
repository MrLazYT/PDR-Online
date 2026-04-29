import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Tests from "./pages/Tests";
import Test from "./pages/Test";
import Books from "./pages/Books";
import Book from "./pages/Book";

function App() {
    return (
        <>
            <Header />
            <Sidebar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/test/:testId" element={<Test />} />
                <Route path="/dovidniki" element={<Books />} />
                <Route path="/dovidniki/:bookType" element={<Book />} />
                <Route path="/dovidniki/:bookType/:chapterSlug" element={<Book />} />
                <Route path="/dovidniki/:bookType/:chapterSlug/:subsectionSlug" element={<Book />} />
            </Routes>
        </>
    );
}

export default App;
