(() => {
  const BGM_LIST = [
    {
      title: "Next To Me",
      url: "https://videotourl.com/audio/1776929147213-4d0b92fd-f911-4426-a7f3-b89fdd1ad0f9.m4a"
    },
    {
      title: "Co-Star",
      url: "https://videotourl.com/audio/1776929944416-24e4fa83-b435-4315-95ae-ee28ca76d147.m4a"
    },
    {
      title: "Slo-Mo",
      url: "https://videotourl.com/audio/1776929744138-0d6e3c85-ce6d-472c-921b-bf824c8c8366.m4a"
    },
    {
      title: "Keep on Moving",
      url: "https://videotourl.com/audio/1776929839920-e5f3fbc7-580c-480e-9071-2a26c9341721.m4a"
    },
    {
      title: "Eye to Eye",
      url: "https://videotourl.com/audio/1776929917438-b026729a-e8d9-48b7-8d19-aca23acd655f.m4a"
    },
    {
      title: "One Day",
      url: "https://videotourl.com/audio/1776930043209-ff7f320f-2272-4840-83c2-8252189dbd71.m4a"
    },
    {
      title: "Ride the Vibe",
      url: "https://videotourl.com/audio/1776930095993-dde661cb-11da-411d-ae4d-15b2c04ea218.m4a"
    },
    {
      title: "Run With Me",
      url: "https://videotourl.com/audio/1776930160109-502991cb-6b2d-436a-98ab-04bcb165959d.m4a"
    }
  ];

  let bgmPlayer = null;

  function getPlayer() {
    if (!bgmPlayer) {
      bgmPlayer = new Audio();
      bgmPlayer.loop = true;
      bgmPlayer.preload = "none";
      bgmPlayer.volume = 0.65;
    }

    return bgmPlayer;
  }

  function pickRandomTrack() {
    if (!BGM_LIST.length) {
      return null;
    }

    const index = Math.floor(Math.random() * BGM_LIST.length);
    return BGM_LIST[index];
  }

  async function playRandomBgmOnGesture() {
    const track = pickRandomTrack();
    if (!track) {
      return false;
    }

    const player = getPlayer();
    const nextUrl = new URL(track.url, window.location.href).href;

    if (player.src !== nextUrl) {
      player.src = track.url;
    }

    try {
      await player.play();
      return true;
    } catch (_error) {
      return false;
    }
  }

  window.NexTiAudio = {
    playRandomBgmOnGesture
  };
})();
