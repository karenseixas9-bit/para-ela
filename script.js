const opening = document.getElementById("opening");
const envelopeButton = document.getElementById("envelopeButton");
const envelope = document.querySelector(".envelope");
const mainContent = document.getElementById("mainContent");
const typedText = document.getElementById("typedText");
const cursor = document.getElementById("cursor");
const hearts = document.getElementById("hearts");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");
const musicIcon = document.getElementById("musicIcon");

const VIDEO_ID = "Pmt01TGsGGA";
let player;
let playerReady = false;
let isPlaying = false;
let opened = false;

const message = `Talvez existam milhares de formas de dizer o quanto alguém é importante. Mas nenhuma delas parece suficiente quando se trata de você.

Desde que você entrou na minha vida, tudo ficou mais leve. Você tem esse jeito único de estar presente, de fazer questão de demonstrar carinho, de cuidar de mim até nos detalhes mais simples. E, sem perceber, transformou dias comuns em momentos que eu quero guardar para sempre.

O que mais me encanta em você não é apenas o seu sorriso ou a forma como você me faz rir. É a maneira como você permanece ao meu lado quando as coisas ficam difíceis. É o jeito que me acolhe, me escuta, me apoia e faz questão de me lembrar, todos os dias, que eu sou importante.

Você demonstra o seu amor em atitudes, em palavras e em gestos. E eu espero que saiba que cada "eu te amo" que vem de você encontra um lugar especial dentro de mim.

Às vezes eu fico pensando no quanto tive sorte de te encontrar. Você é uma mulher incrível, daquelas que fazem a vida valer mais a pena. Você me inspira a ser uma mulher melhor e me faz acreditar que o amor pode ser leve, verdadeiro e cheio de paz.

No meu coração, você já ocupa um lugar que é só seu. Você é a minha namorada, a mulher que eu escolho todos os dias e com quem eu quero compartilhar a vida. Não é apenas sobre o presente; é sobre todos os sonhos que eu ainda quero viver ao seu lado, todas as memórias que ainda vamos criar e todos os sorrisos que ainda vamos dividir.

Quero continuar vivendo momentos ao seu lado, criando memórias, vencendo desafios juntas, comemorando conquistas e construindo uma história linda. Não importa quanto tempo passe, quero continuar escolhendo você.

Obrigada por existir. Obrigada por cuidar de mim. Obrigada por fazer eu me sentir tão amada, tão segura e tão feliz.

Espero que, quando você estiver lendo isso, consiga sentir um pouquinho de tudo o que eu sinto por você. Porque, por mais que as palavras tentem explicar, elas nunca serão suficientes para descrever o tamanho do amor, da admiração e da gratidão que tenho por ter você na minha vida.

Eu te amo hoje, amanhã e em todos os dias que ainda virão. E, se depender de mim, essa será apenas a primeira página da história mais bonita que nós duas vamos escrever juntas.

Com todo o meu amor,

Sua futura esposa. ❤️`;

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player("youtubePlayer", {
    height: "1",
    width: "1",
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: VIDEO_ID,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: () => {
        playerReady = true;
      },
      onStateChange: (event) => {
        isPlaying = event.data === YT.PlayerState.PLAYING;
        updateMusicButton();
      }
    }
  });
};

envelopeButton.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");
  heartBurst(55);

  if (playerReady) {
    player.playVideo();
    isPlaying = true;
  }

  setTimeout(() => {
    opening.style.display = "none";
    mainContent.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    startTyping();
    startGentleHearts();
  }, 1500);
});

musicButton.addEventListener("click", () => {
  if (!playerReady) {
    musicLabel.textContent = "A música está carregando...";
    return;
  }

  if (isPlaying) {
    player.pauseVideo();
    isPlaying = false;
  } else {
    player.playVideo();
    isPlaying = true;
  }

  updateMusicButton();
});

function updateMusicButton() {
  musicIcon.textContent = isPlaying ? "❚❚" : "♫";
  musicLabel.textContent = isPlaying
    ? "Pausar nossa música"
    : "Tocar nossa música";
}

function startTyping() {
  let index = 0;

  function typeNext() {
    if (index >= message.length) {
      cursor.style.display = "none";
      return;
    }

    const character = message.charAt(index);
    typedText.textContent += character;
    index += 1;

    let delay = 13;
    if (character === "\n") delay = 90;
    if ([".", "!", "?"].includes(character)) delay = 70;
    if ([",", ";", ":"].includes(character)) delay = 35;

    setTimeout(typeNext, delay);
  }

  typeNext();
}

function createHeart() {
  const heart = document.createElement("span");
  const symbols = ["❤️", "💗", "💖", "💕", "✨"];
  const duration = 5 + Math.random() * 4;

  heart.className = "heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${14 + Math.random() * 22}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);

  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function heartBurst(amount) {
  for (let i = 0; i < amount; i += 1) {
    setTimeout(createHeart, i * 28);
  }
}

function startGentleHearts() {
  setInterval(createHeart, 650);
}
