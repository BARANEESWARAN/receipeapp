
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipes from './pages/SavedRecipes';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
<BrowserRouter>
<Navbar/>
      <Routes>
        <Route path="/home"  element={<Home />} />
        <Route path="/auth"  element={<Auth />} />
        <Route path="/createrecipe"  element={<CreateRecipe />} />
        <Route path="/savedrecipes"  element={<SavedRecipes />} />
    

   
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
