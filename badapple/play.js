// https://github.com/g-otn/bad-apple-browser-console
const button = document.getElementById('play');
const body = document.querySelector('body');

const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const fps = 30,
  msPerFrame = 1000 / fps;
let frames;

let framesReady = false;
let autoplayed = false;

function tryAutoplay() {
  if (framesReady && !autoplayed) {
    autoplayed = true;
    play();
  }
}

const stop = () => {
  window.stopTimer = true;
  button.innerText = 'Play';
};

const play = async () => {
  button.innerText = 'Stop';
  button.disabled = false;
  console.clear();

  window.stopTimer = false;

  // Start printing directly
  if (frames && frames.length > 0) {
    console.log(frames[0]);
    doTimer(frames.length * msPerFrame, fps, (steps, count) => {
      if (frames[count + 1]) {
        if (isFirefox && (msPerFrame * count) % 6000 < msPerFrame) {
          console.clear();
        }
        console.log(frames[count + 1]);
      } else {
        stop();
      }
    });
  } else {
    console.error("No frames to display.");
    stop();
    button.innerText = 'Error';
  }
};

button.addEventListener('click', (e) => {
  if (button.innerText === 'Play' || button.innerText === 'Error') {
    play();
  } else {
    stop();
  }
});

// Load text
const load = () => {
  button.innerText = 'Fetching frames...';
  button.disabled = true;

  // Directly fetch the braille.txt file
  fetch('badapple/braille.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(content => {
      button.innerText = 'Loading frames...';
      frames = content.split('\n\n');
      delete frames[frames.length - 1]; // Delete last empty 'frame' created by split command

      if (!frames || frames.length === 0 || !frames[0]) {
        console.error('Failed to load or parse frames. Content might be empty or format is incorrect.');
        button.innerText = 'Error';
        button.disabled = false;
        framesReady = false;
        return;
      }

      // Show tip to properly display frames
      const helpLine =
        new Array(frames[0].split('\n')[0].length + 1).join('⣿') +
        '⣿⣿⣿⣿⣿⣿⣿⣿';
      console.clear();
      console.info(
        "%cTweak console width/zoom so that the following line doesn't break:",
        'font-size: 22pt'
      );
      console.info('%c' + helpLine + '\n', 'color: cyan; ');

      framesReady = true;
      tryAutoplay();
    })
    .catch(error => {
      console.error('Error loading braille.txt:', error);
      button.innerText = 'Error loading';
      button.disabled = false;
    });
};

load();
