import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import './Main.scss';

export default function Main() {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemons, setPokemons] = useState([]);

    const amountPokemonPerPage = 10;
    
    useEffect(() => {
        loadPokemonsCount();
    }, []);

    useEffect(() => {
        async function loadPokemons() {
            const offset = currentPage === 1 ? 0 : amountPokemonPerPage * (currentPage - 1);
    
            const response = await api.get(`/pokemon?limit=${amountPokemonPerPage}&offset=${offset}`);
            const { data } =  response;
            const { results } =  data;
            setPokemons(results);
        }

        loadPokemons();
    }, [currentPage]);

    async function loadPokemonsCount() {
        const response = await api.get("/pokemon");
        const { data } = response;
        const { count } = data;

        const pageTotal = Math.ceil(count / amountPokemonPerPage);
        setTotalPages(pageTotal);
    }

    function previousPage() {
        const previousPage = currentPage - 1;
        if (previousPage >= 1)
            setCurrentPage(currentPage - 1);
    }

    function nextPage() {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages)
            setCurrentPage(currentPage + 1);
    }

    return (
        <div id="MainPage">
            <h1>Main</h1>
            <span>Pages of Pokemons: {totalPages}</span>
        
            <div className="pokemon-list">
                {pokemons.map((pokemon, index) => (
                    <div className="pokemon-container" key={index}>
                        <span>{pokemon.name}</span>
                        <span>{pokemon.url}</span>
                    </div>
                ))}
            </div>


            <div className="page-container">
                <button onClick={previousPage}>Anterior</button>
                <span>Pagina atual {currentPage}</span>
                <button onClick={nextPage}>Proxima</button>
            </div>
        </div>
    );
}