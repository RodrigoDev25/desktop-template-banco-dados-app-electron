const { app, BrowserWindow } = require('electron')
const mysql = require('mysql2/promise')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('pages/index.html')
}
function conexaoComBanco() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'electron_db'
  })
}
app.whenReady().then(() => {
  createWindow()
})