import { component$ } from "@builder.io/qwik";
import styles from "./navbar.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <navbar class={styles.navbar}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
          </a>
        </div>
        <ul>
          <li>
            <Link href="/pokemons/list-ssr/">SSR</Link>
          </li>
          <li>
          <Link href="/pokemons/list-client/">Client</Link>
          </li>
          <li>
          <Link href={`/poke/${1}/`}>Poke - ID</Link>
          </li>
        </ul>
      </div>
    </navbar>
  );
});
