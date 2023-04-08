<script lang="ts">
  import { onMount, getContext } from "svelte";
  const context: SvelteStore<any> = getContext("context");
  const amp = getContext("amp");

  let dom: HTMLElement;

  let overflowing = false;

  function getElementWidth(item: HTMLElement): number {
    const itemCS = getComputedStyle(item);
    return (
      parseInt(itemCS.width) +
      parseInt(itemCS.paddingLeft) +
      parseInt(itemCS.paddingRight) +
      parseInt(itemCS.marginLeft) +
      parseInt(itemCS.marginRight) +
      parseInt(itemCS.borderLeftWidth) +
      parseInt(itemCS.borderRightWidth)
    );
  }

  function checkOverflowing() {
    // check overflowing of header
    const header = dom as HTMLElement;
    const itemsContainer = header.querySelector(".items") as HTMLDListElement;
    const items = header.querySelectorAll(".item") as NodeListOf<HTMLElement>;
    const itemsWidth = Array.from(items).reduce(
      (acc, item) => acc + getElementWidth(item),
      0
    );
    const availableWidth = itemsContainer.offsetWidth;
    overflowing = itemsWidth > availableWidth;
  }

  let showMenu = false;
  function toggleMenu() {
    showMenu = !showMenu;
  }

  onMount(() => checkOverflowing());
</script>

<div class="header" bind:this={dom}>
  <a class="logo" href="/" title="Ultimele știri din România"
    >Actualitate<span>net</span></a
  >
  {#if $context.config}
    <div class="items">
      {#each $context.config.menu as item}
        <a
          class="item"
          class:selected={$context.path.startsWith(item.href) ||
            $context.data?.category?.url.endsWith(item.href)}
          href={item.href}
          title={item.title}>{item.html}</a
        >
      {/each}
    </div>

    {#if amp}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="menuButton" on="tap:sidebar1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-menu menuToggle"
          ><line x1="3" y1="12" x2="21" y2="12" /><line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          /><line x1="3" y1="18" x2="21" y2="18" /></svg
        >
      </div>
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="menuButton"
        class:hide={!overflowing}
        class:rotated={showMenu}
        on:click={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-menu menuToggle"
          ><line x1="3" y1="12" x2="21" y2="12" /><line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          /><line x1="3" y1="18" x2="21" y2="18" /></svg
        >
      </div>
    {/if}
  {/if}
</div>

{#if showMenu}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="menu" on:click={toggleMenu}>
    <div class="inner">
      <ul>
        {#if $context.config}
          {#each $context.config.menu as item}
            <li><a href={item.href} title={item.title}>{item.html}</a></li>
          {/each}
        {/if}

        <li><a href="/contact" title="Contact">Contact</a></li>
        <li>
          <a
            href="/politica-confidentialitate"
            title="Politica de confidențialitate"
            >Politica de confidențialitate</a
          >
        </li>
      </ul>
    </div>
  </div>
{/if}

{#if amp}
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      {#if $context.config}
        {#each $context.config.menu as item}
          <li><a href={item.href} title={item.title}>{item.html}</a></li>
        {/each}
      {/if}

      <li><a href="/contact" title="Contact">Contact</a></li>
      <li>
        <a
          href="/politica-confidentialitate"
          title="Politica de confidențialitate">Politica de confidențialitate</a
        >
      </li>
    </ul>
  </amp-sidebar>
{/if}

<window on:resize={checkOverflowing} />

<style lang="scss">
  .header {
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    background-color: #4d91f7;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    color: #fff;
    z-index: 1000;

    .items {
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      overflow: hidden;
      max-width: calc(100% - 200px);
      padding-right: 40px;
      height: 100%;
    }

    a.selected {
      color: #111;
    }

    .menuButton {
      z-index: 1001;
      position: fixed;
      right: 0px;
      top: 0px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 12px;
    }

    .hide {
      display: none;
    }

    .logo {
      text-decoration: none;
      color: inherit;

      padding: 5px;
      border-radius: 2px;

      background-color: #26205a;

      span {
        margin-left: 5px;
        text-transform: uppercase;
        background-color: rgb(0, 16, 243);
        padding: 5px;
        margin-right: -10px;
      }
    }

    .item {
      margin-left: 15px;
      color: #fff;
      text-decoration: none;
      flex-shrink: 0;
      height: 50px;
      line-height: 50px;
    }

    a:hover {
      transform: scale(1.1);
      transition: all 0.2s ease-in-out;
    }
  }

  .rotated {
    transform: rotate(90deg);
    transition: all 0.2s ease-in-out;
  }

  .menu {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 1000;

    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: calc(100% - 20px);
        li {
          margin: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          a {
            width: 100%;
            background-color: #cedfe5;
            padding: 10px;
            text-decoration: none;
            color: #000;
            font-size: 1.5em;
            font-weight: bold;
          }
        }
      }
    }
  }

  amp-sidebar {
    width: calc(100% - 50px);

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: calc(100% - 20px);
      li {
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          width: 100%;
          background-color: #cedfe5;
          padding: 10px;
          text-decoration: none;
          color: #000;
          font-size: 1em;
          font-weight: bold;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .header {
      .items {
        display: none;
      }

      .menuButton {
        display: flex;
      }
    }
  }
</style>
