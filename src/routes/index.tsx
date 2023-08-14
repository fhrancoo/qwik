import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";

export default component$(() => {

  const pokemonId = useSignal(1); // for primitive data types
  // const pokemonId2 = useStore(); // for data types more complex (e.g. array, object, etc).

  const toBack = useSignal(false);

  const isVisible = useSignal(false);


  const changePokemonId = $((value: number) => {
    if ((pokemonId.value + value) <= 0) return;
    pokemonId.value += value;
  });

  const nav = useNavigate();

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>

      <span class="text-9xl">{pokemonId.value}</span>

      {/* <Link href={`/poke/${pokemonId.value}/`}>
        <PokemonImage id={pokemonId.value} width={300} height={300} toBack={toBack.value} isVisible={isVisible.value}></PokemonImage>
      </Link> */}

      
      <div onClick$={async () => {
       await nav(`/poke/${pokemonId.value}/`);  
      }}>
      <PokemonImage id={pokemonId.value} width={300} height={300} toBack={toBack.value} isVisible={isVisible.value}></PokemonImage>
      </div>

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary mr-2">Siguente</button>
        <button onClick$={() => toBack.value = !toBack.value} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ () => isVisible.value = !isVisible.value } class="btn btn-primary ">Revelar/Ocultar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "My App",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
