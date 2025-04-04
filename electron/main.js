const { app: electronApp, BrowserWindow } = require('electron');
const { NestFactory } = require('@nestjs/core');
const path = require('path');
const { AppModule } = require('../nest-server/dist/src/app.module');
const fs = require('fs');

const userDataPath = electronApp.getPath('userData');
const dbPath = path.join(userDataPath, 'tasks.db');
process.env.DB_PATH = dbPath;
console.log('Database path:', dbPath); 

let mainWindow;

const clientPath = path.join(__dirname, '../client/dist');
console.log('Client path exists:', clientPath);
if (!fs.existsSync(path.join(clientPath, 'index.html'))) {
  console.error('Client build not found!');
  electronApp.quit();
}

async function bootstrapNest() {
  try {
    const nestApp = await NestFactory.create(AppModule);
    // nestApp.enableCors();
    nestApp.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
     });
    await nestApp.listen(3001);
    console.log('NestJS server running on port 3001');
  } catch (error) {
    console.error('Failed to start NestJS:', error);
    electronApp.quit();
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile(path.join(__dirname, '../client/dist/index.html'));
  mainWindow.webContents.openDevTools();

}

electronApp.whenReady().then(async () => {
  await bootstrapNest();
  createWindow();
});

electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') electronApp.quit();
});