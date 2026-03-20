const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnLimpar = document.getElementById("btnLimpar");
const listaTarefas = document.getElementById("listaTarefas");

// Busca as tarefas salvas no localStorage
function obterTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

// Salva a lista atual no localStorage
function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Mostra as tarefas na tela
function renderizarTarefas() {
  const tarefas = obterTarefas();
  listaTarefas.innerHTML = "";

  tarefas.forEach((tarefa, indice) => {
    const li = document.createElement("li");
    li.classList.add("lista-item");

    const span = document.createElement("span");
    span.textContent = tarefa;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "X";
    botaoRemover.classList.add("btn-remover");

    // Remove a tarefa clicada
    botaoRemover.addEventListener("click", () => {
      removerTarefa(indice);
    });

    li.appendChild(span);
    li.appendChild(botaoRemover);
    listaTarefas.appendChild(li);
  });
}

// Adiciona uma nova tarefa
function adicionarTarefa() {
  const textoTarefa = inputTarefa.value.trim();

  // Impede tarefa vazia
  if (textoTarefa === "") {
    alert("Digite uma tarefa.");
    return;
  }

  const tarefas = obterTarefas();
  tarefas.push(textoTarefa);
  salvarTarefas(tarefas);

  inputTarefa.value = "";
  inputTarefa.focus();

  renderizarTarefas();
}

// Remove uma tarefa pelo índice
function removerTarefa(indice) {
  const tarefas = obterTarefas();
  tarefas.splice(indice, 1);
  salvarTarefas(tarefas);
  renderizarTarefas();
}

// Remove todas as tarefas
function limparTarefas() {
  localStorage.removeItem("tarefas");
  renderizarTarefas();
}

btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

btnLimpar.addEventListener("click", limparTarefas);

// Carrega as tarefas salvas ao abrir a página
renderizarTarefas();
