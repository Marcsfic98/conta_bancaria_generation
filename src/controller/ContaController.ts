import { Conta } from "../models/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../utils/Colors";

export class ContaController implements ContaRepository {

    private listaContas:Array<Conta> = new Array<Conta>()
    numero:number = 0

    procurarPorNumero(numero: number): void {
        let buscarConta = this.buscaNoArray(numero)

        if(buscarConta !== null){
            buscarConta.visualizar()
        }else{
            console.log(colors.fg.red , '\nAconta numero: '+ numero+ ' nao foi encontrada!', colors.reset)
        }

        
    }
    listarTodas(): void {
        for(let conta of this.listaContas){
            conta.visualizar()
        }
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta)
        console.log(colors.fg.green, '\nA conta numero: '+ conta.numero + 'foi criada com sucesso', colors.reset)
    }
    atualizar(conta: Conta): void {
        let buscarConta = this.buscaNoArray(conta.numero)

        if(buscarConta !== null){
            this.listaContas[this.listaContas.indexOf(buscarConta)] = conta
             console.log(colors.fg.green , '\nAconta numero: '+ conta.numero+ ' nao foi encontrada!', colors.reset)
        }else{
             console.log(colors.fg.red , '\nAconta numero: '+ conta.numero+ ' nao foi encontrada!', colors.reset)
        }
    }
    deletar(numero: number): void {
        let buscarConta = this.buscaNoArray(numero)

        if(buscarConta !== null){
            this.listaContas.splice(this.listaContas.indexOf(buscarConta),1)
            console.log(colors.fg.green , '\nAconta numero: '+ numero+ 'foi Apagada!', colors.reset)
        }else{
            console.log(colors.fg.red , '\nAconta numero: '+ numero+ ' nao foi encontrada!', colors.reset)
        
        }


    }
    sacar(numero: number, valor: number): void {
        let conta = this.buscaNoArray(numero)

        if(conta !== null){
            if(conta.sacar(valor) == true){
                console.log(colors.fg.green , '\no saque na conta: '+ numero+ ' foi efetuado!', colors.reset)
            }
        }else{
             console.log(colors.fg.red , '\nAconta numero: '+ numero+ ' nao foi encontrada!', colors.reset)
        }
    }
    depositar(numero: number, valor: number): void {
        let conta = this.buscaNoArray(numero)

        if(conta !== null){
            conta.depositar(valor)
            console.log(colors.fg.green , '\no deposito na conta: '+ numero+ ' foi efetuado!', colors.reset)
        }else{
         console.log(colors.fg.red , '\nAconta numero: '+ numero+ ' nao foi encontrada!', colors.reset)
        }
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
       let contaOrigem = this.buscaNoArray(numeroOrigem)
        let contaDestino = this.buscaNoArray(numeroDestino)

        if(contaOrigem !== null && contaDestino !== null){
            if(contaOrigem.sacar(valor) === true){
                contaDestino.depositar(valor)
                 console.log(colors.fg.green , '\na transferencia da conta: '+ contaOrigem+ 'para conta: '+ contaDestino+ ' foi efetuado!', colors.reset)
            }

             console.log(colors.fg.red , '\nAconta numero: '+ numeroOrigem+ 'ou'+ numeroDestino+ ' nao foi encontrada!', colors.reset)
        }
    }



    //metodos auxiliares

    public gerarNumero():number{
        return ++ this.numero
    }

    public buscaNoArray(numero:number):Conta | null{
        for(let conta of this.listaContas){
            if(conta.numero === numero)
                return conta
        }

        return null
    }
    
}