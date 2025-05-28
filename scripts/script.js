let formulario = document.getElementById("form-index");

formulario.addEventListener("submit", function(event) {
  event.preventDefault();
  let varNome = document.getElementById("input-nome").value;
  let varEmail = document.getElementById("input-email").value;

  console.log(varNome, varEmail);
});
