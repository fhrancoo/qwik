import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  width?: number;
  height?: number;
  toBack?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(({
  id,
  width = 200,
  height = 200,
  toBack = false,
  isVisible = false
}: Props) => {

  const imgLoaded = useSignal(false);

  useTask$(({ track }) => {
    track(() => id );
    imgLoaded.value = false;
  })

  useTask$(({ track }) => {
    track(() => toBack );
    imgLoaded.value = false;
  })

  const urlImg = (toBack) ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png` :
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div class="flex items-center justify-center" style={{width: width + 'px', height: height + 'px'}}>
      {!imgLoaded.value && <span>Cargando...</span>}
      <img class={[{ 'brightness-0': !isVisible, 'hidden': !imgLoaded.value }, 'transition-all']} src={urlImg} alt="img pokemon" width={width} height={height} onLoad$={() => imgLoaded.value = true} />
    </div>
    )
})