const TYPE = {
    WORK: 'work',
    REST: 'rest'
};

const WORK_TIME = 25 * 60;
const REST_TIME = 5 * 50;
const START_WORKING = '开始工作';
const STOP_WORKING = '停止工作';
const START_REST = '开始休息';
const STOP_REST = '停止休息';
const WORK_DEFAULT_CURRENT = {
    time: WORK_TIME,
    duration: WORK_TIME,
    controlButtonStatus: START_WORKING
};
const REST_DEFAULT_CURRENT = {
    time: REST_TIME,
    duration: REST_TIME,
    controlButtonStatus: START_REST
};
const WORK_NOTIFICATION = {
    title: '恭喜你完成任务',
    body: '是否开始休息',
    confirmButtonText: '休息5分钟',
    cancelButtonText: '继续工作'
};
const REST_NOTIFICATION = {
    title: '休息结束',
    body: '开始您的工作吧',
    confirmButtonText: '开始工作',
    cancelButtonText: '继续休息'
};

const POMODORO = {
    [TYPE.WORK]: {
        controlButtonStatus: {
            start: START_WORKING,
            stop: STOP_WORKING
        },
        duration: WORK_TIME,
        defaultCurrent: WORK_DEFAULT_CURRENT,
        notification: WORK_NOTIFICATION
    },
    [TYPE.REST]: {
        controlButtonStatus: {
            start: START_REST,
            stop: STOP_REST
        },
        duration: REST_TIME,
        defaultCurrent: REST_DEFAULT_CURRENT,
        notification: REST_NOTIFICATION
    }
};

module.exports = {
    TYPE,
    POMODORO,
    START_WORKING,
    START_REST,
    STOP_WORKING,
    STOP_REST,
    WORK_TIME,
    REST_TIME,
    WORK_DEFAULT_CURRENT
};
