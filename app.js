const gerenciador = new GerenciadorClientes();

const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");

const campoId = document.getElementById("id");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const campoCidade = document.getElementById("cidade");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

// Apresentar clientes na tabela
function renderizarClientes(clientes = gerenciador.consultar()) {

    lista.innerHTML = "";

    document.getElementById("totalClientes").textContent =
        gerenciador.clientes.length;

    if (clientes.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">Nenhum cliente encontrado.</td>
            </tr>
        `;
        return;
    }

    clientes.forEach(cliente => {

        const linha = document.createElement("tr");

        const valores = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.cidade
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const tdAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "editar";

        btnEditar.onclick = () => editarCliente(cliente.id);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "excluir";

        btnExcluir.onclick = () => excluirCliente(cliente.id);

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);

        linha.appendChild(tdAcoes);
        lista.appendChild(linha);
    });
}

// Cadastrar ou atualizar
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const telefone = campoTelefone.value.trim();
    const cidade = campoCidade.value.trim();

    if (!nome || !email || !telefone || !cidade) {
        alert("Preencha todos os campos!");
        return;
    }

    let sucesso;

    if (campoId.value) {

        sucesso = gerenciador.atualizar(
            Number(campoId.value),
            { nome, email, telefone, cidade }
        );

    } else {

        const cliente = new Cliente(
            nome,
            email,
            telefone,
            cidade
        );

        sucesso = gerenciador.cadastrar(cliente);
    }

    if (sucesso) {
        form.reset();
        campoId.value = "";
        btnSalvar.textContent = "Cadastrar Cliente";
        document.getElementById("tituloFormulario").textContent =
            "Cadastrar Cliente";

        renderizarClientes();
    }
});

// Editar cliente
function editarCliente(id) {

    const cliente = gerenciador.clientes.find(
        c => c.id === id
    );

    if (!cliente) return;

    campoId.value = cliente.id;
    campoNome.value = cliente.nome;
    campoEmail.value = cliente.email;
    campoTelefone.value = cliente.telefone;
    campoCidade.value = cliente.cidade;

    btnSalvar.textContent = "Salvar Alterações";

    document.getElementById("tituloFormulario").textContent =
        "Editar Cliente";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Excluir cliente
function excluirCliente(id) {

    if (confirm("Deseja realmente excluir este cliente?")) {
        gerenciador.excluir(id);
        renderizarClientes();
    }
}

// Pesquisar cliente
pesquisa.addEventListener("input", function() {

    const resultado = gerenciador.pesquisar(
        pesquisa.value.trim()
    );

    renderizarClientes(resultado);
});

// Cancelar edição
btnCancelar.addEventListener("click", function() {

    form.reset();
    campoId.value = "";

    btnSalvar.textContent = "Cadastrar Cliente";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Cliente";
});

// Limpar todos os registros
document.getElementById("btnLimparTudo").addEventListener(
    "click",
    function() {

        if (confirm("Deseja realmente apagar TODOS os clientes?")) {
            gerenciador.limparTudo();
            renderizarClientes();
            form.reset();
            campoId.value = "";
            pesquisa.value = "";
            btnSalvar.textContent = "Cadastrar Cliente";
            document.getElementById("tituloFormulario").textContent =
                "Cadastrar Cliente";
        }
    }
);

// Carregar os clientes ao abrir o sistema
renderizarClientes();

