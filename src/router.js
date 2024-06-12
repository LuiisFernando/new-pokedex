import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
  } from "react-router-dom";

import Main from './pages/Main';
import Pokemon from "./pages/PokemonNovo";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<span>errorrr</span>}>
            <Route index element={<Main />} />
            <Route path="/pokemon" element={<Pokemon />} />
        </Route>
    )
);

  export default router;