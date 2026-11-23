class GerenciadorClientes {

    constructor() {
        this.clientes = JSON.parse(
            localStorage.getItem("clientes")
        ) || [];
    }

    salvarLocalStorage() {
        localStorage.setItem(
            "clientes",
            JSON.stringify(this.clientes)
        );
    }

    cadastrar(cliente) {
        const emailExiste = this.clientes.some(
            c => c.email.toLowerCase() === cliente.email.toLowerCase()
        );

        if (emailExiste) {
            alert("Este e-mail já está cadastrado!");
            return false;
        }

        this.clientes.push(cliente);
        this.salvarLocalStorage();

        return true;
    }

    consultar() {
        return [...this.clientes].sort(
            (a, b) => a.nome.localeCompare(b.nome, "pt-BR")
        );
    }

    pesquisar(termo) {
        return this.consultar().filter(cliente =>
            cliente.nome.toLowerCase().includes(termo.toLowerCase()) ||
            cliente.email.toLowerCase().includes(termo.toLowerCase())
        );
    }

    atualizar(id, dados) {
        const cliente = this.clientes.find(
            c => c.id === id
        );

        if (!cliente) return false;

        const emailExiste = this.clientes.some(
            c => c.id !== id &&
            c.email.toLowerCase() === dados.email.toLowerCase()
        );

        if (emailExiste) {
            alert("Este e-mail já pertence a outro cliente!");
            return false;
        }

        cliente.atualizar(
            dados.nome,
            dados.email,
            dados.telefone,
            dados.cidade
        );

        this.salvarLocalStorage();
        return true;
    }

    excluir(id) {
        this.clientes = this.clientes.filter(
            c => c.id !== id
        );

        this.salvarLocalStorage();
    }

    limparTudo() {
        this.clientes = [];
        this.salvarLocalStorage();
    }
}


