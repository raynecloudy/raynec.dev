<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  import About from "./About.svelte";
  import Contact from "./Contact.svelte";
  import Donators from "./Donators.svelte";
  import Friends from "./Friends.svelte";
  import NotFound from "./NotFound.svelte";
  import Puns from "./Puns.svelte";
  import Socials from "./Socials.svelte";

  // @ts-ignore
  let picture: HTMLDivElement = $state();
  // @ts-ignore
  let main: HTMLElement = $state();
  let loaded = $state(false);
  let lightsOn = $state(false);
  
  onMount(() => {
    loaded = true;
    // @ts-ignore
    lightsOn = `${(localStorage.getItem("lights") ?? window.matchMedia("prefers-color-scheme: dark").matches)}` === "true";
    document.body.className = lightsOn ? "" : "dark";
  });
</script>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;300;400;500;600;700;800&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap");

  :root {
    --background: linear-gradient(-15deg, #fbf0ff, #fff0fb);
    --link: #6817ff;
    --portrait-background: #fcf8ff;
    --primary: #ffc5f5;
    --text: #581ec2;
    color-scheme: light;
  }

  :root:has(:global(body.dark)) {
    --background: #1b0817;
    --link: #a371ff;
    --portrait-background: #11030e;
    --primary: #58284c;
    --text: #fdbeff;
    color-scheme: dark;
  }

  :global(body) {
    color: var(--text);
    background: var(--background);
    text-shadow: 0.1rem 0.1rem 0 var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 3rem;
    width: calc(100vw - 6rem);
    height: calc(100vh - 6rem);
    font-family: "Mukta Mahee";
  }

  :global(::selection) {
    text-shadow: none;
    background-color: var(--primary);
    color: var(--text);
  }

  :focus-visible,
  :global(:focus-visible)  {
    outline: 0.15rem solid var(--text);
  }
  
  main {
    display: flex;
    gap: 5rem;
    position: relative;
    align-items: center;
    outline: 0.15rem solid var(--primary);
    padding: 3.5rem;
    border-radius: 7rem;
    box-shadow: 0.3rem 0.3rem 0 var(--primary);
  }

  #info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #info * {
    margin: 0;
  }

  div:has(> #picture) {
    width: 17rem;
    height: 20rem;
    border-radius: 4rem;
    background-color: var(--primary);
    overflow: hidden;
  }

  #picture {
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background-image: url("/rayne.png");
    background-color: var(--portrait-background);
    background-size: 25rem;
    position: relative;
    top: 0.3rem;
    left: 0.3rem;
    background-repeat: no-repeat;
  }

  #social-bar {
    display: flex;
    /* padding-top: 1rem; */
    /* gap: 1.2rem; */
    /* outline: 0.15rem solid var(--primary); */
    border-radius: 1rem;
    overflow: hidden;
  }

  #social-bar a {
    display: block;
    user-select: none;
    line-height: 0rem;
    padding: 0.8rem;
    flex-grow: 1;
    text-align: center;
  }

  #social-bar img {
    height: 1.4rem;
  }

  #social-bar a:not(:not(:hover, :focus-visible)),
  .light-up {
    outline: none;
    background-color: var(--primary);
  }

  main > content {
    width: 35rem;
    height: 30rem;
    overflow-x: visible;
    overflow-y: auto;
    position: relative;
  }

  main > content > container {
    position: absolute;
    top: 0;
    left: 0;
  }

  select {
    padding: 0.5rem 1rem;
    font: inherit;
    border: none;
    margin: 0;
    color: inherit;
    text-shadow: inherit;
    background-color: transparent;
    outline: 0.15rem solid var(--primary);
    border-radius: 1rem;
    cursor: pointer;
  }

  option {
    background-color: inherit;
  }

  :global(a) {
    color: var(--link);
  }
  
  iframe,
  :has(iframe) {
    width: inherit;
    height: inherit;
    overflow: hidden;
  }

  @media (max-width: 70rem) {
    :global(body) {
      display: block;
      padding: 0;
    }

    main {
      flex-direction: column;
      width: calc(100% - 1rem);
      position: static;
      border-radius: 0;
      box-shadow: none;
      outline: none;
    }

    #info,
    main content {
      width: 100%;
    }

    div:has(> #picture) {
      width: 100%;
    }

    #picture {
      background-position: 50% 0 !important;
    }

    main > content {
      height: calc(100vh - 5rem);
    }
  }
</style>

<svelte:body onmousemove={(event) => {
  picture.style.backgroundPosition = `${(event.clientX / 80) - 60}px ${(event.clientY / 80) - 35}px`;
  main.style.left = `${(event.clientX / -40)}px`;
  main.style.top = `${(event.clientY / -40)}px`;
}} onkeydown={(event) => {
  if (event.key === "l") {
    lightsOn = !lightsOn;
    document.body.className = lightsOn ? "" : "dark";
    localStorage.setItem("lights", `${lightsOn}`);
  }
}}></svelte:body>

<svelte:head>
  <title>
    {(() => {
      switch (page.url.hash) {
        case "":
          return "rayne cloudy!";

        case "#contact":
          return "contact!";

        case "#donators":
          return "patreons! <3";

        case "#friends":
          return "my buddies!";

        case "#socials":
          return "my online presence";

        case "#puns":
          return "rayne and eliza's epic pun battle!";
      
        default:
          return "not found";
      }
    })()}
  </title>
</svelte:head>

{#if loaded}
<main in:fade bind:this={main}>
  <div id="info">
    <div>
      <div id="picture" bind:this={picture}></div>
    </div>
    <h2>rayne cloudy</h2>
    <div id="social-bar">
      <a href="https://github.com/raynecloudy" in:fly={{ delay: 200, y: "1rem" }} title="github"><img src="/GitHub_Invertocat_{lightsOn ? "Dark" : "Light"}.svg" alt="github"></a>
      <a href="https://bsky.app/profile/raynec.dev" in:fly={{ delay: 400, y: "1rem" }} title="bluesky"><img src="/bsky-{lightsOn ? "black" : "white"}.svg" alt="bluesky"></a>
      <a href="https://discord.gg/mD6metDHNE" in:fly={{ delay: 600, y: "1rem" }} title="discord server" class={page.url.hash === "#contact" ? "light-up" : ""}><img src="/Discord-Symbol-{lightsOn ? "Black" : "White"}.svg" alt="discord"></a>
      <a href="https://patreon.com/raynecloudy" in:fly={{ delay: 800, y: "1rem" }} title="patreon" class={page.url.hash === "#donators" ? "light-up" : ""}><img src="/PATREON_SYMBOL_1_{lightsOn ? "BLACK" : "WHITE"}_RGB.svg" alt="patreon"></a>
    </div>
    <select bind:value={page.url.hash} onchange={(event) => location.hash = event.currentTarget.value}>
      <option value="" selected>about</option>
      <option value="#contact">contact</option>
      <option value="#donators">donators</option>
      <option value="#friends">friends</option>
      <option value="#guestbook">guestbook</option>
      <option value="#socials">socials</option>
      <option disabled>----- extras -----</option>
      <option value="#puns">rayne and eliza's pun battle</option>
    </select>
  </div>
  <content>
    {#if page.url.hash === ""}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <About />
      </div>
    </container>
    {:else if page.url.hash === "#contact"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <Contact />
      </div>
    </container>
    {:else if page.url.hash === "#donators"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <Donators />
      </div>
    </container>
    {:else if page.url.hash === "#friends"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <Friends />
      </div>
    </container>
    {:else if page.url.hash === "#guestbook"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <iframe src="https://raynecloudy.atabook.org/" frameborder="0" title="guestbook"></iframe>
      </div>
    </container>
    {:else if page.url.hash === "#socials"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <Socials />
      </div>
    </container>
    {:else if page.url.hash === "#puns"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <Puns />
      </div>
    </container>
    {:else}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <NotFound />
      </div>
    </container>
    {/if}
  </content>
</main>
{/if}
