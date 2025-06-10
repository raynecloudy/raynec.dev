<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

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
    --portrait-background: #fcf8ff;
    --primary: #ffc5f5;
    --text: #581ec2;
  }

  :root:has(:global(body.dark)) {
    --background: #1b0817;
    --portrait-background: #11030e;
    --primary: #58284c;
    --text: #fdbeff;
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

  ::selection {
    text-shadow: none;
    background-color: var(--primary);
    color: var(--text);
  }

  :focus-visible {
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

  #donator-list,
  #friends-list {
    list-style: "❤ ";
  }

  .rainbow-donator {
    animation: rainbow 4s infinite linear forwards;
  }

  .rainbow-donator::marker {
    color: #ff0000;
  }

  .rainbow-donator a {
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(90deg, #ff0095, #ffbb00);
    color: #ff9100;
    text-shadow: none;
    font-weight: bold;
  }

  @keyframes rainbow {
    0% {
      filter: hue-rotate(0deg);
    }

    100% {
      filter: hue-rotate(360deg);
    }
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
      <a href="https://github.com/raynecloudy" in:fly={{ delay: 200, y: "1rem" }}><img src="/GitHub_Invertocat_{lightsOn ? "Dark" : "Light"}.svg" alt="github"></a>
      <a href="https://bsky.app/profile/raynec.dev" in:fly={{ delay: 400, y: "1rem" }}><img src="/bsky-{lightsOn ? "black" : "white"}.svg" alt="bluesky"></a>
      <a href="https://discord.gg/mD6metDHNE" in:fly={{ delay: 600, y: "1rem" }}><img src="/Discord-Symbol-{lightsOn ? "Black" : "White"}.svg" alt="discord"></a>
      <a href="https://patreon.com/raynecloudy" in:fly={{ delay: 800, y: "1rem" }} class={page.url.hash === "#donators" ? "light-up" : ""}><img src="/PATREON_SYMBOL_1_{lightsOn ? "BLACK" : "WHITE"}_RGB.svg" alt="patreon"></a>
    </div>
    <select bind:value={page.url.hash} onchange={(event) => location.hash = event.currentTarget.value}>
      <option value="" selected>about</option>
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
        <h1>about</h1>
        <p>he/she</p>
        <p>hii!! my names rayne!!</p>
        <p>i'm a teenage computer scientist on the internet. i've been programming for eight years and have had an interest in web development for five years. i really like music, mexican food, and typescript.</p>
        <p>i started programming when i was seven years old. i've come a long way since then!! the first programming language i learned was python, and i'm now fluent in four more: javascript, typescript, rust, and C++!</p>
      </div>
    </container>
    {:else if page.url.hash === "#donators"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <h1>patreons</h1>
        <p>thank you to all the people who've donated to me!!!! it makes my day to know people enjoy what i make &lt;3</p>
        <ul id="donator-list">
          <li class="rainbow-donator"><a href="https://dumorando.com">dumorando</a></li>
          <li><a href="https://samv.me">shock59</a></li>
        </ul>
      </div>
    </container>
    {:else if page.url.hash === "#friends"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <h1>friends</h1>
        <p>i have some pretty cool friends :3</p>
        <ul id="friends-list">
          <li><a href="https://elizadoesstuff.nekoweb.org">eliza</a></li>
          <li><a href="https://samv.me">shock59</a></li>
          <li><a href="https://steve0greatness.nekoweb.org">steve0greatness</a></li>
          <li><a href="https://tally.gay">tally</a></li>
        </ul>
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
        <h1>socials</h1>
        <p>this page sums up my entire current online presence.</p>
        <ul>
          <li><a href="https://artfight.net/~raynecloudy">artfight</a></li>
          <li><a href="https://bsky.app/profile/raynec.dev">bluesky</a></li>
          <li><a href="https://chess.com/member/raynecloudy">chess.com</a></li>
          <li><a href="https://discord.gg/mD6metDHNE">discord</a></li>
          <li><a href="https://github.com/raynecloudy">github</a></li>
          <li><a href="https://patreon.com/raynecloudy">patreon</a></li>
          <li><a href="https://pronouns.cc/@raynec">pronouns.cc</a></li>
        </ul>
      </div>
    </container>
    {:else if page.url.hash === "#puns"}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <h1>rayne and eliza's epic pun battle!!</h1>
        <p>me and my friend eliza had a pun battle in discord DMs. with permission, i've put it here so everybody can see these cheesy computer science puns :3</p>
        <p><i>eliza:&nbsp;</i>anyway i'm <a href="https://en.wikipedia.org/wiki/Switch_statement">switch</a>ing [these if statements] to a switch/case statement now</p>
        <p><i>rayne:&nbsp;</i>i see what you did there (probably because you bolded it)</p>
        <p><i>eliza:&nbsp;</i>yeah, i bolded it just in <a href="https://en.wikipedia.org/wiki/Switch_statement">case</a></p>
        <p><i>rayne:&nbsp;</i>oh my goodness you did it twice</p>
        <p><i>eliza:&nbsp;</i>yeah, these puns are getting pretty bad, i should stop, or <a href="https://en.wikipedia.org/wiki/Conditional_(computer_programming)#If%E2%80%93then(%E2%80%93else)">else</a> i'll run out of puns to make</p>
        <p><i>rayne:&nbsp;</i><a href="https://en.wikipedia.org/wiki/Conditional_(computer_programming)#If%E2%80%93then(%E2%80%93else)">if</a> you make one more i'm going to <a href="https://en.wikipedia.org/wiki/Control_flow#Early_exit_from_loops">break</a> your face</p>
        <p><i>eliza:&nbsp;</i>ooh that was a good one, but maybe we should <a href="https://en.wikipedia.org/wiki/Branching_(version_control)">branch</a> out a little more</p>
        <p><i>rayne:&nbsp;</i>don't be <a href="https://en.wikipedia.org/wiki/Push_technology">push</a>y about it</p>
        <p><i>eliza:&nbsp;</i>oh <a href="https://en.wikipedia.org/wiki/For_loop">for</a> goodness sakes, i guess we've really <a href="https://en.wikipedia.org/wiki/Commit_(version_control)">commit</a>ted to the bit now, haven't we</p>
        <p><i>rayne:&nbsp;</i>these jokes are so bad i may have to leave and <a href="https://en.wikipedia.org/wiki/Return_statement">return</a> when you're through. it's becoming an <a href="https://en.wikipedia.org/wiki/Software_project_management#Issue">issue</a></p>
        <p><i>eliza:&nbsp;</i>i <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">promise</a> i'll stop eventually</p>
        <p><i>rayne:&nbsp;</i>i'll be <a href="https://en.wikipedia.org/wiki/Wait_(command)">wait</a>ing <a href="https://www.lua.org/pil/4.3.3.html">until</a> you run out</p>
        <p><i>eliza:&nbsp;</i>you might be waiting a <a href="https://en.wikipedia.org/wiki/While_loop">while</a></p>
        <p><i>rayne:&nbsp;</i>i may have to <a href="https://en.wikipedia.org/wiki/Exit_(command)">exit</a> this chat and <a href="https://en.wikipedia.org/wiki/Async/await">await</a> your exhaustion</p>
        <p><i>eliza:&nbsp;</i>i'm sure we could <a href="https://en.wikipedia.org/wiki/Array_(data_structure)">array</a>nge for that</p>
        <p><i>rayne:&nbsp;</i>i'll have plenty of things to <a href="https://carpentry.library.ucsb.edu/2021-01-21-SWC-Bash-online/05-loop/index.html">do</a> outside</p>
        <p><i>eliza:&nbsp;</i><a href="https://en.wikipedia.org/wiki/AND_gate">and</a> i'm sure touching grass would be good for you</p>
        <p><i>rayne:&nbsp;</i>oh, you're gonna be like that, huh? &gt;:&lpar; take that back <a href="https://en.wikipedia.org/wiki/OR_gate">or</a> i will <a href="https://en.wikipedia.org/wiki/Make_(software)">make</a> mincemeat out of your face</p>
        <p><i>eliza:&nbsp;</i>hey, <a href="https://en.wikipedia.org/wiki/This_(computer_programming)">this</a> doesn't have to <a href="https://www.lua.org/pil/4.2.html">end</a> like that</p>
        <p><i>rayne:&nbsp;</i>you may want to take a <a href="https://en.wikipedia.org/wiki/Class_(computer_programming)">class</a> on being nice to people, we're more than <a href="https://en.wikipedia.org/wiki/Object_(computer_science)">object</a>s for you to be <a href="https://en.wikipedia.org/wiki/Using#Programming_language_keywords">using</a></p>
        <p><i>eliza:&nbsp;</i>you may need to include yourself in that class too. you might <a href="https://www.w3schools.com/nodejs/nodejs_modules.asp">require</a> some anger management classes too if you're just going to <a href="https://en.wikipedia.org/wiki/Run_command">run</a> around threatening to punch peoples' faces <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in">in</a></p>
        <p><i>rayne:&nbsp;</i>if any<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body">body</a> here needs to <a href="https://en.wikipedia.org/wiki/Touch_(command)">touch</a> grass, it's you</p>
        <p><i>eliza:&nbsp;</i>not to be too <a href="https://en.wikipedia.org/wiki/Strict">strict</a> here, but since when was touch a coding word? i don't re<a href="https://en.wikipedia.org/wiki/System_call">call</a> that being part of any language i know</p>
        <p><i>rayne:&nbsp;</i>you'll find it's a bash command for creating files, much like i'm going to <a href="https://en.wikipedia.org/wiki/Bash_(Unix_shell)">bash</a> your <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head">head</a> off</p>
        <p><i>eliza:&nbsp;</i>woah, no need to over<a href="https://en.wikipedia.org/wiki/React_(software)">react</a></p>
        <p><i>rayne:&nbsp;</i>you <a href="https://en.wikipedia.org/wiki/Const_(computer_programming)">constant</a>ly annoy me. i may have to ask you to leave my <a href="https://en.wikipedia.org/wiki/Property_(programming)">property</a> if this <a href="https://en.wikipedia.org/wiki/Control_flow#Continuation_with_next_iteration">continue</a>s</p>
        <p><i>eliza:&nbsp;</i>i hate to call this off early, but my <a href="https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)">parent</a>s are telling me i have to shower. i guess we'll have to return to this later</p>
        <p><i>rayne:&nbsp;</i>i would hope <a href="https://en.wikipedia.org/wiki/Inverter_(logic_gate)">not</a></p>
      </div>
    </container>
    {:else}
    <container>
      <div in:fly={{ y: "1rem", opacity: 1 }}>
        <h1>404</h1>
        <p>this page could not be found</p>
      </div>
    </container>
    {/if}
  </content>
</main>
{/if}
