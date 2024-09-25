const { app, BrowserWindow } = require('electron')


let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    resizable: false,
    frame: false,
    nodeIntegration: true,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      enablemotemodule: true
    }

  })

  mainWindow.loadFile('index.html')

  // 监听鼠标按下事件
  mainWindow.on('mousedown', (event) => {
    if (event.button === 0) { // 左键按下
      mainWindow.startDragging()
    }
  })

  // 监听鼠标移动事件
  mainWindow.on('mousemove', (event) => {
    if (mainWindow.isDragging()) {
      mainWindow.setPosition(event.screenX - mainWindow.dragOffsetX, event.screenY - mainWindow.dragOffsetY)
    }
  })

  // 监听鼠标释放事件
  mainWindow.on('mouseup', () => {
    mainWindow.stopDragging()
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
