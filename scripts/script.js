// Pega o formulário do HTML usando o ID "form-index"
let formulario = document.getElementById("form-index");

// Adiciona um ouvinte de evento ao formulário
// Esse código será executado quando o usuário clicar em "Cadastrar"
formulario.addEventListener("submit", function (event) {

  // Impede que o formulário atualize a página automaticamente (comportamento padrão do submit)
  event.preventDefault();

  // Pega o valor digitado no campo de nome (input com id="input-nome")
  let varNome = document.getElementById("input-nome").value;

  // Pega o valor digitado no campo de email (input com id="input-email")
  let varEmail = document.getElementById("input-email").value;

  // Chama a função "cadastrarUsuario" que está no preload.js (exposta com contextBridge)
  // Essa função envia os dados para o processo principal (main.js)
  window.api.cadastrarUsuario(varNome, varEmail);
});
