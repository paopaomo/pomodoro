const { app, BrowserWindow, Notification, ipcMain } = require('electron');

let mainWindow;

const handleIPC = () => {
    ipcMain.handle('notification', (e, data) => {
        return new Promise((resolve, reject) => {
            const { title, body, confirmButtonText, cancelButtonText } = data;
            const notification = new Notification({
                title,
                body,
                actions: [{
                    text: confirmButtonText,
                    type: 'button'
                }],
                closeButtonText: cancelButtonText
            });
            notification.show();
            notification.on('action', () => {
                resolve({ event: 'action' });
            });
            notification.on('close', () => {
                resolve({ event: 'close' });
            });
        });
    })
};

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile('./index.html');
    return mainWindow;
};

app.whenReady().then(() => {
    createMainWindow();
    handleIPC();
});
