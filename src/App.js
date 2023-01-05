//dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Pages
import Home from "./Pages/Home.js";
import Index from "./Pages/Index.js";
import Show from "./Pages/Show.js";
import New from "./Pages/New.js";
import Edit from "./Pages/Edit.js";
import Error from "./Pages/Error.js";

//Components
import NavBar from "./Components/NavBar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Index />} />
            <Route path="/transactions/new" element={<New />} />
            <Route path="/transactions/:index" element={<Show />} />
            <Route path="/transactions/:index/edit" element={<Edit />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
