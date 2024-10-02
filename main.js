const { app, BrowserWindow } = require('electron');

let Store;
const storePromise = import('electron-store').then(module => {
  Store = module.default;  // 使用默认导出
});

let mainWindow;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

function createWindow() {
  storePromise.then(() => {
    const store = new Store();
    const savedBounds = store.get('windowBounds') || { x: 1220, y: 200, width: 500, height: 300 };

    mainWindow = new BrowserWindow({
      x: savedBounds.x,
      y: savedBounds.y,
      width: savedBounds.width,
      height: savedBounds.height,
      transparent: true,
      resizable: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadFile('index.html');

    mainWindow.webContents.on('ipc-message', (event, channel, args) => {
      if (channel === 'drag-start') {
        isDragging = true;
        dragOffset = args;
      } else if (channel === 'drag-move') {
        if (isDragging) {
          const { screenX, screenY } = args;
          mainWindow.setPosition(screenX - dragOffset.x, screenY - dragOffset.y);
        }
      } else if (channel === 'drag-stop') {
        isDragging = false;
      }
    });

    mainWindow.on('close', () => {
      const bounds = mainWindow.getBounds();
      store.set('windowBounds', bounds);
    });

    mainWindow.on('closed', function () {
      mainWindow = null;
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
