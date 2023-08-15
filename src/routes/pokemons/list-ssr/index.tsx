import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';
import { type SmallPokemon } from '~/interfaces/small-pokemon';


export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect }) => {

  const offset = query.get('offset') ? +query.get('offset')! : 0;
  if( offset < 0 )  {
    throw redirect(302, `/pokemons/list-ssr?offset=0`);
  }

  return await getSmallPokemons( offset );
})

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const currenOffset = useComputed$<number>(() => {

    const offset = new URLSearchParams(location.url.search);    
    return +( offset.get('offset') ?? '0');
  })

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">STATUS</span>
        <span>Pag. Actual: { currenOffset } </span>
        <span>Esta cargando pagina: { location.isNavigating ? 'SI' : 'NO' }</span>
      </div>
      
      <div class="mt-10">
        <Link class="btn btn-primary mr-2" reload prefetch href={`/pokemons/list-ssr?offset=${ (currenOffset.value - 10) }`}>
          ANTERIORES
        </Link>
        <Link class="btn btn-primary mr-2" reload prefetch  href={`/pokemons/list-ssr?offset=${ (currenOffset.value + 10) }`}>
          SIGUIENTES
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({name}) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center"> <span class="capitalize">{name}</span></div>
            ))
        }
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "SSR",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};