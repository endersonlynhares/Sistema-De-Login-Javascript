class Conta{
    constructor(nome = "",sobrenome = "",email, senha){
        this.nome = nome 
        this.sobrenome = sobrenome
        this.email = email
        this.senha = senha 
    }

    verificarErro(){
        for(let i in this){
            if(this[i] === null || this[i] === undefined || this[i] === ""){
                return false
            }else{
                return true
            }
        }
    }

}

class BD{
    constructor(){
        let id = localStorage.getItem("id")
        
        if(id === null){
            localStorage.setItem("id", 0)
        }
    }

    getProximoId(){
        let id = localStorage.getItem("id")

        return Number(id) + 1
    }

    cadastrar(conta){
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(conta))

        localStorage.setItem("id", id)
    }

    recuperarContas(){
        let id = localStorage.getItem("id");
        let contas = []
        for(let i = 1; i <= id; i++){
            let conta = JSON.parse(localStorage.getItem(i));

            if(conta === null){
                continue
            }

            contas.push(conta)
        }

        return contas
    }

    login(conta){
        let contasFiltradas = []
        contasFiltradas = this.recuperarContas()

        if(conta.email !== "" || conta.senha !== ""){
            contasFiltradas = contasFiltradas.filter(function(c){
                return conta.email === c.email && conta.senha === c.senha
            })
        }

        if(contasFiltradas.length === 1){
            return true
        }else{
            return false
        }

    }

}
let bd = new BD();

function cadastrarConta(){
    let email = document.getElementById("txtE")
    let senha = document.getElementById("txtS")
    let nome = document.getElementById("txtN")
    let sobrenome = document.getElementById("txtB")

    let conta = new Conta(nome.value,sobrenome.value,email.value, senha.value);

    if(conta.verificarErro()){
        $("#modal").modal("show")
        bd.cadastrar(conta)
    }
}

function entrarConta(){
    let email = document.getElementById("txtE").value
    let senha = document.getElementById("txtS").value

    let conta = new Conta(undefined, undefined,email, senha)

    if(bd.login(conta)){    
        window.location.href = "index.html"
    }
}