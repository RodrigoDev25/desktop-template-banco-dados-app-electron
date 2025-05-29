// Importa as ferramentas necessárias do Electron:
// - app: controla o ciclo de vida do aplicativo (iniciar, sair, etc).
// - BrowserWindow: cria e gerencia janelas (interface).
// - ipcMain: permite ouvir mensagens enviadas do frontend (renderer).
const { app, BrowserWindow, ipcMain } = require('electron');

// Importa o mysql2 com suporte a Promises (async/await),
// para conectar ao banco de dados MySQL de forma moderna.
const mysql = require('mysql2/promise');

// Função que cria a janela principal da interface gráfica do app
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,   // Define a largura da janela
    height: 600,  // Define a altura da janela
    webPreferences: {
      // Define o caminho do arquivo preload, que faz a ponte segura entre HTML e Node.js
      preload: __dirname + '/preload.js',
      contextIsolation: true, // Garante segurança isolando o contexto do navegador
    }
  });

  // Carrega o arquivo HTML da interface do usuário
  win.loadFile('pages/index.html');
};

// Função assíncrona que realiza a conexão com o banco de dados MySQL
async function conexaoComBanco() {
  // Cria uma conexão usando os dados de acesso ao banco
  const conexao = await mysql.createConnection({
    host: 'localhost',      // Local onde está o banco de dados
    user: 'root',           // Nome de usuário
    password: 'root',       // Senha do banco
    database: 'electron_db' // Nome do banco de dados que será usado
  });

  return conexao; // Retorna o objeto da conexão para ser usado nas consultas
}

// Escuta um pedido chamado 'criar-usuario' vindo do renderer (HTML/JS)
// Recebe os dados de nome e email, e insere no banco de dados
ipcMain.handle('criar-usuario', async (event, nome, email) => {
  const conexao = await conexaoComBanco(); // Conecta ao banco

  // SQL para inserir os dados do novo usuário
  const criarUsuarioSql = 'INSERT INTO usuarios(nome, email) VALUES(?, ?)';

  // Executa a inserção no banco de forma segura (com prepared statement)
  const resultado = await conexao.execute(criarUsuarioSql, [nome, email]);

  // Você pode retornar um resultado para o frontend se quiser:
  return { sucesso: true, resultado };
});

// Quando o aplicativo estiver pronto, executa a função que cria a janela
app.whenReady().then(() => {
  createWindow();
});
