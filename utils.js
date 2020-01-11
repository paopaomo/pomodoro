const formatTime = (s) => {
    const ss = (s % 60).toFixed();
    const mm = (s/ 60).toFixed();
    return `${mm.toString().padStart(2, 0)}:${ss.toString().padStart(2, 0)}`;
};

module.exports = { formatTime };
