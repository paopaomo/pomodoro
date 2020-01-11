const { ipcRenderer } = require('electron');
const Timer = require('timer.js');
const ProgressBar = require('progressbar.js/dist/progressbar');
const { TYPE, POMODORO, START_WORKING, START_REST, STOP_WORKING, STOP_REST, WORK_TIME, REST_TIME, WORK_DEFAULT_CURRENT } = require('./consts');
const { formatTime } = require('./utils');

let current = {
    ...WORK_DEFAULT_CURRENT,
    type: TYPE.WORK
};

const progressBar = new ProgressBar.Circle('#timer-container', {
    trailColor: '#eee',
    trailWidth: 1,
    color: '#ED6A5A',
    strokeWidth: 3,
    svgStyle: null
});
const controlButton = document.getElementById('control-button');

const render = () => {
    const { time, duration, controlButtonStatus } = current;
    progressBar.set(1 - time / duration);
    progressBar.setText(formatTime(time));
    controlButton.innerText = controlButtonStatus;
};

render();

const updateCurrent = (params) => {
  current = {
      ...current,
      ...params
  };
  render();
};

const notification = () => {
    const { onConfirm, onCancel } = actions[current.type];

    ipcRenderer.invoke('notification', POMODORO[current.type].notification)
        .then(({ event }) => {
            if(event === 'action') {
                onConfirm();
            }
            if(event === 'close') {
                onCancel();
            }
        });
};

const workTimer = new Timer({
    ontick: (time) => {
        updateCurrent({ time: time / 1000 });
    },
    onend: () => {
        updateCurrent({
            ...POMODORO[current.type].defaultCurrent,
            time: 0
        });
        notification();
    },
    onstart: () => {
        updateCurrent({ controlButtonStatus: POMODORO[current.type].controlButtonStatus.stop })
    },
    onstop: () => {
        updateCurrent(POMODORO[current.type].defaultCurrent)
    }
});

const startWork = () => {
    updateCurrent({ type: TYPE.WORK });
    workTimer.start(WORK_TIME);
};

const startRest = () => {
    updateCurrent({ type: TYPE.REST });
    workTimer.start(REST_TIME);
};

const actions = {
    [TYPE.WORK]: {
        onConfirm: startRest,
        onCancel: startWork
    },
    [TYPE.REST]: {
        onConfirm: startWork,
        onCancel: startRest
    }
};

controlButton.onclick = () => {
    const currentText = controlButton.innerText;
    switch(currentText) {
        case START_WORKING:
            startWork();
            break;
        case STOP_WORKING:
            workTimer.stop();
            break;
        case START_REST:
            startRest();
            break;
        case STOP_REST:
            workTimer.stop();
            break;
    }
};

