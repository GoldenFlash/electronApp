const { app, BrowserWindow } = require('electron')
const {catchConsoleLogLink,removeUnecessaryTabs} = require("./devtools")
const { readConfig, filePath } = require("./config/index");

// var remotedev = require('remotedev-server');
// remotedev({ hostname: 'localhost', port: 8081 });

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  win.webContents.executeJavaScript('console.log(window)');
  win.webContents.executeJavaScript(`console.log("win",${win})`);
  
  // const { config, isConfigBroken, error } = readConfig();

  // win.debuggerConfig = {
  //   port:8081,
  //   editor: config.editor,
  //   fontFamily: config.fontFamily,
  //   defaultReactDevToolsTheme: config.defaultReactDevToolsTheme,
  //   defaultReactDevToolsPort: config.defaultReactDevToolsPort,
  //   networkInspect: 1,
  //   isPortSettingRequired: 1,
  //   timesJSLoadToRefreshDevTools:-1,
  // };

  // 打开开发者工具
  win.webContents.openDevTools()

  // win.webContents.on('devtools-opened', async () => {
  //   catchConsoleLogLink(win);
  // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。