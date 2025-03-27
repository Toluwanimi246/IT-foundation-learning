import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CollectInfo from "./CollectInfo";
import Display from "./Display";
import NotFound from "./NotFound";
function App() {
  return (
    <Router> <div className="App">
      <Routes>
       
      <Route path="/" element={<CollectInfo />} />
      <Route path="/profiles/:id" element={<Display />} />
      <Route path="*" element={<NotFound />} />
      </Routes> </div>
    </Router>
  );
}

export default App;
