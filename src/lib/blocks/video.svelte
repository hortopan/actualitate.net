<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  export let html: string;

  let aspectRatio = 16 / 9;

  // try to find aspect ration from html video
  const w = html.match(/width="(\d+)"/);
  const h = html.match(/height="(\d+)"/);

  if (w && h) {
    const width = parseInt(w[1], 10);
    const height = parseInt(h[1], 10);
    aspectRatio = width / height;
  }

  let dom: HTMLElement;

  function videoPlay() {
    dom.querySelector("video")!.play();
  }

  function videoPause() {
    dom.querySelector("video")!.pause();
  }

  function videoProgress() {
    const currentTime = Math.floor(dom.querySelector("video")!.currentTime);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime - minutes * 60;
    const formattedTime = `${minutes.toString().padStart(1, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    dom.querySelector(".kg-video-current-time")!.textContent = formattedTime;
  }

  function videoPlaying() {
    (dom.querySelector(".kg-video-overlay") as HTMLDivElement)!.style.display =
      "none";

    dom.querySelector(".kg-video-play-icon")!.classList.add("kg-video-hide");
    dom
      .querySelector(".kg-video-pause-icon")!
      .classList.remove("kg-video-hide");
  }

  function videoStopped() {
    (dom.querySelector(".kg-video-overlay") as HTMLDivElement)!.style.display =
      "flex";

    dom.querySelector(".kg-video-play-icon")!.classList.remove("kg-video-hide");
    dom.querySelector(".kg-video-pause-icon")!.classList.add("kg-video-hide");
  }

  function videoToggle() {
    if (dom.querySelector("video")!.paused) {
      dom.querySelector("video")!.play();
    } else {
      dom.querySelector("video")!.pause();
    }
  }

  function muteToggle() {
    const video = dom.querySelector("video") as HTMLVideoElement;
    video.muted = !video.muted;

    if (!video.muted) {
      dom.querySelector(".kg-video-mute-icon")!.classList.add("kg-video-hide");
      dom
        .querySelector(".kg-video-unmute-icon")!
        .classList.remove("kg-video-hide");
    } else {
      dom
        .querySelector(".kg-video-mute-icon")!
        .classList.remove("kg-video-hide");
      dom
        .querySelector(".kg-video-unmute-icon")!
        .classList.add("kg-video-hide");
    }
  }

  function videoSlider() {
    const slider = dom.querySelector(
      ".kg-video-seek-slider"
    ) as HTMLInputElement;
    const video = dom.querySelector("video") as HTMLVideoElement;
    const time = (video.duration / 100) * parseInt(slider.value);

    video.currentTime = time;
  }

  function videoVolume() {
    const slider = dom.querySelector(
      ".kg-video-volume-slider"
    ) as HTMLInputElement;
    const video = dom.querySelector("video") as HTMLVideoElement;

    video.volume = parseInt(slider.value) / 100;
  }

  onMount(() => {
    dom.querySelector("video")?.addEventListener("playing", videoPlaying);
    dom.querySelector("video")?.addEventListener("pause", videoStopped);
    dom.querySelector("video")?.addEventListener("ended", videoStopped);
    dom.querySelector("video")?.addEventListener("click", videoToggle);
    dom.querySelector("video")?.addEventListener("timeupdate", videoProgress);
    dom
      .querySelector(".kg-video-volume-slider")
      ?.addEventListener("input", videoVolume);

    dom
      .querySelector(".kg-video-seek-slider")
      ?.addEventListener("input", videoSlider);

    dom
      .querySelector(".kg-video-play-icon")
      ?.addEventListener("click", videoPlay);

    dom
      .querySelector(".kg-video-large-play-icon")
      ?.addEventListener("click", videoPlay);

    dom
      .querySelector(".kg-video-play-icon")
      ?.addEventListener("click", videoPlay);

    dom
      .querySelector(".kg-video-pause-icon")
      ?.addEventListener("click", videoPause);

    dom
      .querySelector(".kg-video-mute-icon")
      ?.addEventListener("click", muteToggle);
    dom
      .querySelector(".kg-video-unmute-icon")
      ?.addEventListener("click", muteToggle);
  });

  onDestroy(() => {
    dom
      ?.querySelector(".kg-video-large-play-icon")
      ?.removeEventListener("click", videoPlay);

    dom
      ?.querySelector(".kg-video-seek-slider")
      ?.removeEventListener("input", videoSlider);

    dom
      ?.querySelector(".kg-video-volume-slider")
      ?.removeEventListener("input", videoVolume);

    dom
      ?.querySelector(".kg-video-play-icon")
      ?.removeEventListener("click", videoPlay);
    dom
      ?.querySelector("video")
      ?.removeEventListener("timeupdate", videoProgress);
    dom?.querySelector("video")?.removeEventListener("playing", videoPlaying);
    dom?.querySelector("video")?.removeEventListener("pause", videoStopped);
    dom?.querySelector("video")?.removeEventListener("ended", videoStopped);
    dom?.querySelector("video")?.removeEventListener("click", videoToggle);
    dom
      ?.querySelector(".kg-video-play-icon")
      ?.removeEventListener("click", videoPlay);
    dom
      ?.querySelector(".kg-video-pause-icon")
      ?.removeEventListener("click", videoPause);

    dom
      ?.querySelector(".kg-video-mute-icon")
      ?.removeEventListener("click", muteToggle);
    dom
      ?.querySelector(".kg-video-unmute-icon")
      ?.removeEventListener("click", muteToggle);
  });
</script>

<div class="container" bind:this={dom} style="--aspectRatio: {aspectRatio}">
  {@html html}
</div>

<style lang="scss">
  .container {
    max-width: var(--max-width);
    max-height: 90vh;
    aspect-ratio: var(--aspectRatio, 16/9);
    margin: 10px auto;

    :global {
      .kg-video-card,
      .kg-video-card * {
        box-sizing: border-box;
        margin: 0;
      }

      .kg-video-card {
        position: relative;
        --seek-before-width: 0%;
        --volume-before-width: 100%;
        --buffered-width: 0%;
      }

      .kg-video-card video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .kg-video-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .kg-video-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.3) 0,
          transparent 70%,
          transparent 100%
        );
        z-index: 999;
        transition: opacity 0.2s ease-in-out;
      }

      .kg-video-large-play-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 72px;
        height: 72px;
        padding: 0;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        transition: opacity 0.2s ease-in-out;
      }

      .kg-video-large-play-icon svg {
        width: 20px;
        height: auto;
        margin-left: 2px;
        fill: #fff;
      }

      .kg-video-player-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
        z-index: 999;
        transition: opacity 0.2s ease-in-out;

        button.kg-video-playback-rate {
          display: none;
        }
      }

      .kg-video-player {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        width: 100%;
        z-index: 9999;
        padding: 12px 16px;
      }

      .kg-video-current-time {
        min-width: 38px;
        padding: 0 4px;
        color: #fff;
        font-family: inherit;
        font-size: 0.85em;
        font-weight: 500;
        line-height: 1.4em;
        white-space: nowrap;
      }

      .kg-video-time {
        color: rgba(255, 255, 255, 0.6);
        font-family: inherit;
        font-size: 0.85em;
        font-weight: 500;
        line-height: 1.4em;
        white-space: nowrap;
      }

      .kg-video-duration {
        padding: 0 4px;
      }

      .kg-video-play-icon,
      .kg-video-pause-icon {
        position: relative;
        padding: 0px 4px 0 0;
        font-size: 0;
        background: transparent;
      }

      .kg-video-hide {
        display: none !important;
      }

      .kg-video-hide-animated {
        opacity: 0 !important;
        transition: opacity 0.2s ease-in-out;
        cursor: initial;
      }

      .kg-video-play-icon svg,
      .kg-video-pause-icon svg {
        width: 14px;
        height: 14px;
        fill: #fff;
      }

      .kg-video-seek-slider {
        flex-grow: 1;
        margin: 0 4px;
      }

      @media (max-width: 520px) {
        .kg-video-seek-slider {
          display: none;
        }
      }

      .kg-video-playback-rate {
        min-width: 37px;
        padding: 0 4px;
        color: #fff;
        font-family: inherit;
        font-size: 0.85em;
        font-weight: 600;
        line-height: 1.4em;
        text-align: left;
        background: transparent;
        white-space: nowrap;
      }

      @media (max-width: 520px) {
        .kg-video-playback-rate {
          padding-left: 8px;
        }
      }

      .kg-video-mute-icon,
      .kg-video-unmute-icon {
        position: relative;
        bottom: -1px;
        padding: 0 4px;
        font-size: 0;
        background: transparent;
      }

      @media (max-width: 520px) {
        .kg-video-mute-icon,
        .kg-video-unmute-icon {
          margin-left: auto;
        }
      }

      .kg-video-mute-icon svg,
      .kg-video-unmute-icon svg {
        width: 16px;
        height: 16px;
        fill: #fff;
      }

      .kg-video-volume-slider {
        width: 80px;
      }

      @media (max-width: 300px) {
        .kg-video-volume-slider {
          display: none;
        }
      }

      .kg-video-seek-slider::before {
        content: "";
        position: absolute;
        left: 0;
        width: var(--seek-before-width) !important;
        height: 4px;
        cursor: pointer;
        background-color: #ebeef0;
        border-radius: 2px;
      }

      .kg-video-volume-slider::before {
        content: "";
        position: absolute;
        left: 0;
        width: var(--volume-before-width) !important;
        height: 4px;
        cursor: pointer;
        background-color: #ebeef0;
        border-radius: 2px;
      }

      /* Resetting browser styles
/* --------------------------------------------------------------- */

      .kg-video-card input[type="range"] {
        position: relative;
        -webkit-appearance: none;
        background: transparent;
      }

      .kg-video-card input[type="range"]:focus {
        outline: none;
      }

      .kg-video-card input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
      }

      .kg-video-card input[type="range"]::-ms-track {
        cursor: pointer;
        border-color: transparent;
        color: transparent;
        background: transparent;
      }

      .kg-video-card button {
        display: flex;
        align-items: center;
        border: 0;
        cursor: pointer;
      }

      .kg-video-card input[type="range"] {
        height: auto;
        padding: 0;
        border: 0;
      }

      /* Chrome & Safari styles
/* --------------------------------------------------------------- */

      .kg-video-card input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }

      .kg-video-card input[type="range"]::-webkit-slider-thumb {
        position: relative;
        box-sizing: content-box;
        width: 13px;
        height: 13px;
        margin: -5px 0 0 0;
        border: 0;
        cursor: pointer;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.24);
      }

      .kg-video-card input[type="range"]:active::-webkit-slider-thumb {
        transform: scale(1.2);
      }

      /* Firefox styles
/* --------------------------------------------------------------- */

      .kg-video-card input[type="range"]::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }

      .kg-video-card input[type="range"]::-moz-range-progress {
        background: #ebeef0;
        border-radius: 2px;
      }

      .kg-video-card input[type="range"]::-moz-range-thumb {
        box-sizing: content-box;
        width: 13px;
        height: 13px;
        border: 0;
        cursor: pointer;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.24);
      }

      .kg-video-card input[type="range"]:active::-moz-range-thumb {
        transform: scale(1.2);
      }

      /* Edge & IE styles
/* --------------------------------------------------------------- */

      .kg-video-card input[type="range"]::-ms-track {
        width: 100%;
        height: 3px;
        border: solid transparent;
        color: transparent;
        cursor: pointer;
        background: transparent;
      }

      .kg-video-card input[type="range"]::-ms-fill-lower {
        background: #fff;
      }

      .kg-video-card input[type="range"]::-ms-fill-upper {
        background: #ebeef0;
      }

      .kg-video-card input[type="range"]::-ms-thumb {
        box-sizing: content-box;
        width: 13px;
        height: 13px;
        border: 0;
        cursor: pointer;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.24);
      }

      .kg-video-card input[type="range"]:active::-ms-thumb {
        transform: scale(1.2);
      }
    }
  }
</style>
