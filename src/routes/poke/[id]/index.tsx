import { component$ } from '@builder.io/qwik';
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';

export default component$(() => {

  const location = useLocation();
  console.log('location: ', location);

  return (
    <>
      <PokemonImage id={ +location.params.id }/>
    </>
);
});

export const head: DocumentHead = {
  title: "Poke",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};