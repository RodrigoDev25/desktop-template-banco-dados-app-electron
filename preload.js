// Importa duas ferramentas do Electron:
// - contextBridge: permite expor funções do processo principal para o frontend (HTML/JS) com segurança.
// - ipcRenderer: permite enviar mensagens do processo renderer (frontend) para o processo main (backend).
const { contextBridge, ipcRenderer } = require('electron');

// Expõe um objeto chamado "api" no escopo global da janela (window.api),
// permitindo que o HTML/JS acesse funções seguras definidas aqui.
contextBridge.exposeInMainWorld('api', {

    // Cria uma função chamada "cadastrarUsuario", que será acessível no navegador (HTML)
    // Ela recebe os parâmetros nome e email
    cadastrarUsuario: (nome, email) => {
        
        // Envia esses dados (nome, email) para o processo principal (main.js)
        // usando o canal 'criar-usuario'.
        // O método invoke espera uma resposta do main e retorna uma Promise com o resultado.
        return ipcRenderer.invoke('criar-usuario', nome, email);
    }

    // Assim, ao chamar window.api.cadastrarUsuario(nome, email), o main process vai inserir no banco.
});
