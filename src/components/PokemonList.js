import './css/PokemonListStyle.css';
import {useEffect, useState} from 'react';

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingWidth, setLoadingWidth] = useState(0);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=100000", {method: "GET"})
        .then(async data => {
            data = await data.json();
            return data;
        })
        .then(data => {
            let allPokemons = data.results;
            let pokemonCount = allPokemons.length;
            let pokemonCounter = 1;

            for (let p = 0; p < pokemonCount; p++) {
                let pokemonName = allPokemons[p].name;
                let currentPokemons;

                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {method: "GET"})
                .then(data => {
                    data = data.json(); 
                    return data;
                })
                .then(data => {
                    let sprite = data.sprites["front_default"];
                    pokemonCounter++;
                    
                    if (sprite !== null) {
                        currentPokemons = pokemons;
                        currentPokemons.push({name: pokemonName, sprite: sprite});
                        setPokemons(currentPokemons);

                        //Increase Status Bar Width for Loading Container
                        setLoadingWidth(pokemonCounter / pokemonCount * 100);
                    }
                })
                .finally(() => {
                    if (pokemonCounter == pokemonCount) setLoading(false);
                });
            }
        });
    }, []);
    
    if (loading) return(
        <div className="loadingContainer">
            <div className="statusBar">
                <div className="statusBarCounter" style={{width: loadingWidth + "%"}}></div>
            </div>
        </div>
    );

    return(
        <div className="pokemonList">
            {pokemons.map((e, i) => (
                <div key={i} className="pokemon">
                    <img src={e.sprite} />
                    <p>{e.name}</p>
                </div>
            ))}
        </div>
    );
}