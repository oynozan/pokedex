import './css/PokedexContainerStyle.css';
import PokemonList from './PokemonList.js';

export default function PokedexContainer() {
    function searchPokemon(e) {
        let value = e.target.value.toLowerCase();
        let pokemonsEl = document.querySelectorAll(".pokemon p");
        pokemonsEl.forEach(el => {
            if (value) {
                if (!el.innerText.includes(value)) el.parentElement.style = "display:none;";
                else el.parentElement.style = "display:block;";
            }
            else el.parentElement.style = "display:block;";
        });
    }
    
    return(
        <div className="pokedexContainer">
            <input onChange={searchPokemon} placeholder="Search Pokemon by its name (E.g: Pikachu)" />
            <PokemonList />
        </div>
    );
}