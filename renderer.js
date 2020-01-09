const { ipcRenderer } = require('electron');
const Timer = require('timer.js');

const updateTime = (ms) => {
    const timerContainer = document.getElementById('timer-container');
    const s = (ms / 1000).toFixed(0);
    const ss = (s % 60);
    const mm = (s / 60).toFixed(0);
    timerContainer.innerText = `${mm.toString().padStart(2, 0)}:${ss.toString().padStart(2, 0)}`;
};

const notification = () => {
    ipcRenderer.invoke('work-notification')
        .then(res => {
            if(res === 'rest') {
                setTimeout(() => {
                    alert('休息');
                }, 5 * 1000)
            } else if(res === 'work') {
                startWork();
            }
        });
};

const startWork = () => {
  const workTimer = new Timer({
      ontick: updateTime,
      onend: notification
  });
  workTimer.start(10);
};

startWork();
