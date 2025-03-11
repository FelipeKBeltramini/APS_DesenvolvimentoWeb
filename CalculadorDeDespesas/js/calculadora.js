class Calculadora {

    constructor(){
        this.nomeDespesas = [];
        this.valorDespesa = [];
    }
    

    inserir() {

        let cpNome = document.getElementById('nome');
        let valorDespesa = document.getElementById('valor');

        if(cpNome.value != '' && valorDespesa.value !== '') {

            this.nomeDespesas.push(cpNome.value + " - " + valorDespesa.value);
            this.valorDespesa.push(parseFloat(valorDespesa.value));
            
            let nomesStr = this.nomeDespesas.join(';');

            localStorage.nomeDespesas = nomesStr;

            cpNome.value = '';
            valorDespesa.value = '';
            cpNome.focus();
        }

        this.exibir();
        this.calcularDespesa();
    }


    exibir() {

        let lista = document.getElementById('nomeDespesas');
        lista.innerHTML = '';

        for (let i = 0; i < this.nomeDespesas.length; i++) {

            let item = document.createElement('li');
            item.innerHTML = this.nomeDespesas[i];

            lista.appendChild(item);
        }
         
    }

    recuperarLista() {

        let listaStr = localStorage.nomeDespesas;

        if(listaStr != 'undefined') {
            this.nomeDespesas = listaStr.split(';');
        }

        this.exibir();
        this.calcularDespesa();
    }

    apagarLista() {
        localStorage.clear();
        location.reload();
    }

    calcularDespesa(){
        let despesaMaisCara = 0;
        let despesaMaisBarata = Infinity;
        let despesaTotal = 0;

        for(let despesa of this.nomeDespesas){
            let valorDespesa = parseFloat(despesa.split(" - ")[1]);
            despesaTotal += valorDespesa;
    
            if(valorDespesa > despesaMaisCara) {
                despesaMaisCara = valorDespesa;
            }

            if(valorDespesa < despesaMaisBarata) {
                despesaMaisBarata = valorDespesa;
            }
        }

        let quantidadeDespesas = this.nomeDespesas.length;
        let despesaMedia = quantidadeDespesas > 0 ? despesaTotal / quantidadeDespesas : 0;

        document.getElementById('despesaMaisCara').textContent = despesaMaisCara;
        document.getElementById('despesaMaisBarata').textContent = despesaMaisBarata !==Infinity ? despesaMaisBarata : "N/A";
        document.getElementById('valorMedio').textContent = despesaMedia.toFixed(2);
        document.getElementById('valorTotal').textContent = despesaTotal;
    }

}

var s = new Calculadora();

window.onload = () => {
    s.recuperarLista();
}