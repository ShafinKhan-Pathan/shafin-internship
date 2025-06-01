import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import NewItems from "./components/home/NewItems";
import TopSellers from "./components/home/TopSellers";
import HotCollections from "./components/home/HotCollections";
import AOSProvider from "./components/UI/AOSProvider";

function App() {
  return (
    <Router>
      <AOSProvider />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/author/:id"
          element={
            <Author
              newItems={NewItems}
              topSellers={TopSellers}
              hotCollections={HotCollections}
            />
          }
        />
        <Route
          path="/item-details/:id"
          element={<ItemDetails newItems={NewItems} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
