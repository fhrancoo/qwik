import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';
import { type SmallPokemon } from '~/interfaces/small-pokemon';


export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query }) => {
  console.log('🔸 query: ', query);

  const offset = query.get('offset');
  console.log(' 🟨 offset: ', offset);

  if (offset) {
    typeof offset;
    console.log('🟨 typeof offset: ', typeof offset);
  }
  return await getSmallPokemons(+(offset ?? 0));
})

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const currenOffset = useComputed$<number>(() => {
    // const res = location.url.searchParams.get('offset');

    const offset = new URLSearchParams(location.url.search);
    console.log('currenOffset -> offset: ', offset);

    console.log(+( offset.get('offset') ?? '0'));
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
        <Link class="btn btn-primary mr-2" href={`/pokemons/list-ssr?offset=${ (currenOffset.value - 10) }`}>
          ANTERIORES
        </Link>
        <Link class="btn btn-primary mr-2" href={`/pokemons/list-ssr?offset=${ (currenOffset.value + 10) }`}>
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