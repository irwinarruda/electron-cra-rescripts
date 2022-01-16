const path = require("path");

const fs = require("fs");
const fsPromisses = fs.promises;
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    // Open the DevTools.
    // if (isDev) {
    //     win.webContents.openDevTools({ mode: "detach" });
    // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on("renderer/save_file", async (event, value) => {
    try {
        const message = value.data.file;
        const { canceled, filePath } = await dialog.showSaveDialog();
        if (canceled) {
            event.reply("main/save_file", { response: { status: 400 } });
            return;
        }
        await fsPromisses.writeFile(filePath, message, "utf-8");
        event.reply("main/save_file", { response: { status: 200 } });
    } catch (err) {
        console.log("err", err);
    }
});
