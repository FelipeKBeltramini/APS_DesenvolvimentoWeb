let listOfCeps = [];

async function getCep(cepInputValue) {
    const btn = document.getElementById('btn');
    try {
        btn.setAttribute('disabled', true);
        const res = await fetch(`https://viacep.com.br/ws/${cepInputValue}/json/`, { method: 'GET' });
        const data = await res.json();
        const { bairro, cep, complemento, ddd, localidade, logradouro, uf, ...rest } = data;
        alert(JSON.stringify(data));
        return data;
    } catch (e) {
        alert('Erro ao buscar o cep', e);
        console.log(e);
    } finally {
        btn.removeAttribute('disabled');
    }
}

async function handleChangeInput() {
    const cepInputValue = document.getElementById('inputCep');
    if (cepInputValue.value.length == 8) {
        try {
            const data = await getCep(cepInputValue.value);
            const newListCep = listOfCeps ? [...listOfCeps, data] : [data];
            localStorage.setItem('listOfCeps', JSON.stringify(newListCep));
            pushCepIntoUl(data);
            cepInputValue.value = '';
        } catch (e) {
            alert('Erro ao buscar o cep', e);
            console.log(e);
        }
    }
}

async function handleWindonwLoad() {
    listOfCeps = JSON.parse(localStorage.getItem('listOfCeps'));
    if (listOfCeps) {
        listOfCeps.forEach((cep) => {
            pushCepIntoUl(cep);
        });
    }
}

function pushCepIntoUl(cep) {
    let ul = document.getElementById('cepList');
    const card = `
    <div class="card">
        <li>
            <h2>CEP: ${cep.cep}</h2>
            <h3>Logradouro: ${cep.logradouro}</h3>
            <h3>Bairro: ${cep.bairro}<h3>
            <h3>Cidade: ${cep.localidade}<h3>
            <h3>UF: ${cep.uf}<h3>
            <h3>DDD: ${cep.ddd}<h3>
        </li>
    </div>`;
    ul.innerHTML += card;
}

function handleClearList() {
    localStorage.clear();
    document.getElementById('cepList').innerHTML = '';
}