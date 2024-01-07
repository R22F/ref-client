import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RouteConst} from './interface/RouteConst';
import {Homepage} from './pages/HomePage';
import {SignUp} from './pages/SignUp';
import {RecipePage} from './pages/CookingDB';
import {Inventory} from './pages/Inventory';
import {Header} from './components/header/Header';
import {TotalReview} from './pages/TotalReview';
import {Settlement} from './pages/Settlement';
import {EnvObserver} from "./components/common";
import {Footer} from "./components/footer/Footer";



function App() {
  return (
    <BrowserRouter>
      <EnvObserver/>
      <Header />
      <Routes>
        <Route path={RouteConst.HomePage} element={<Homepage />} />
        <Route path={RouteConst.Signup} element={<SignUp />} />
        <Route path={RouteConst.CookingDB} element={<RecipePage />} />
        <Route path={RouteConst.settlement} element={<Settlement />} />
        <Route path={RouteConst.Inventory} element={<Inventory />} />
        <Route path={RouteConst.TotalReview} element={<TotalReview />} />
      </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
