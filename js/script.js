function criarVitrine(frutas) {

    const listaFrutasVitrine = document.querySelector('#fruits-vitrine').innerHTML = ""

    for (let i = 0; i < frutas.length; i++) {

        //1) CRIAR TAGS DO TEMPLATE VITRINE
        let liVitrine = document.createElement('li')
        let figureVitrine = document.createElement('figure')
        let imgVitrine = document.createElement('img')
        let divInfoFruit = document.createElement('div')
        let buttonCategoria = document.createElement('button')
        let nameFruit = document.createElement('h2')
        let description = document.createElement('p')
        let priceFruit = document.createElement('h3')
        let buttonAdd = document.createElement('button')

        //2) ADICIONAR CLASSES ÀS TAGS DO TEMPLATE VITRINE
        liVitrine.classList.add('li-cadrs-fruit')
        figureVitrine.classList.add('figure-card')
        imgVitrine.classList.add('img-fruit')
        divInfoFruit.classList.add('info-fruit')
        buttonCategoria.classList.add('button-categoria')
        nameFruit.classList.add('name-fruit')
        description.classList.add('description-fruit')
        priceFruit.classList.add('price-fruit')
        buttonAdd.classList.add('button-add-fruit', 'buttonFruit')

        //3) ATRIBUIR VALOR ÀS PROPRIEDADES DAS TAGS
        liVitrine.id = frutas[i].id
        imgVitrine.src = frutas[i].image
        imgVitrine.alt = frutas[i].name
        buttonCategoria.innerText = frutas[i].categoria
        nameFruit.innerText = frutas[i].name
        description.innerText = frutas[i].descricao
        priceFruit.innerText = formatPrice(frutas[i].price)
        buttonAdd.innerText = frutas[i].addFruit
        buttonAdd.id = 'btnAdicionar_' + frutas[i].id

        buttonAdd.addEventListener('click', adicionarFruta)
        //4) VICULAR AS TAGS DO TEMPLATE HIERARQUICAMENTE 
        liVitrine.append(figureVitrine, divInfoFruit)
        figureVitrine.appendChild(imgVitrine)
        divInfoFruit.append(buttonCategoria, nameFruit, description, priceFruit, buttonAdd)

        //5) PENDURAR A TAG LI À TAG UL (#fruits-vitrine)
        const listaFrutasVitrine = document.querySelector('#fruits-vitrine').appendChild(liVitrine)
    }
}
criarVitrine(frutas)

let contarFruta = 0
let totalCarrinho = 0

function adicionarFruta(event) {

    contarFruta++
    document.querySelector('#qtde-fruits-carrinho').innerHTML = contarFruta;

    let idBotao = event.target.id
    let idBotaoAdd = Number(idBotao.substring(13))

    let fruta = procurarFruta(idBotaoAdd)

    let frutaAdicionada = criarCarrinho(fruta)

    totalCarrinho += fruta.price

    let totalCompra = document.querySelector('#total-fruits-carrinho')

    totalCompra.innerText = formatPrice(totalCarrinho)

    document.querySelector('#fruits-carrinho').appendChild(frutaAdicionada)

    let carrinhoVazio = document.querySelector('.mensagem-carrinho-vazio')
    let addItens = document.querySelector('.mensagem-adicione-itens')

    carrinhoVazio.innerHTML = " "
    addItens.innerHTML = " "

}


function procurarFruta(id) {
    let idBotao = id
    for (let i = 0; i < frutas.length; i++) {
        let fruta = frutas[i]

        if (fruta.id == idBotao) {
            console.log(fruta);
            return fruta
        }
    }
    return 'Fruta não encontrada.'
}

function criarCarrinho(fruta) {

    //1) CRIAR TAGS DO TEMPLATE VITRINE
    let liCarrinho = document.createElement('li')
    let figureCarrinho = document.createElement('figure')
    let imgCarrinho = document.createElement('img')
    let divInfoCompra = document.createElement('div')
    let nameFruitCarrinho = document.createElement('h4')
    let priceFruitCarrinho = document.createElement('p')
    let buttonRemove = document.createElement('button')

    //2) ADICIONAR CLASSES ÀS TAGS DO TEMPLATE VITRINE
    liCarrinho.classList.add('card-fruit-add')
    figureCarrinho.classList.add('figure-card-carrinho')
    imgCarrinho.classList.add('img-fruit-carrinho')
    divInfoCompra.classList.add('info-compra-carrinho')
    nameFruitCarrinho.classList.add('name-fruit-carrinho')
    priceFruitCarrinho.classList.add('price-fruit-carrinho')
    buttonRemove.classList.add('button-remove-fruit', 'buttonFruit')

    //3) ATRIBUIR VALOR ÀS PROPRIEDADES DAS TAGS
    liCarrinho.id = 'fruitCarrinho_' + fruta.id
    imgCarrinho.src = fruta.image
    imgCarrinho.alt = fruta.name
    nameFruitCarrinho.innerText = fruta.name
    priceFruitCarrinho.innerText = formatPrice(fruta.price)
    buttonRemove.id = 'btnRemover_' + fruta.id
    buttonRemove.innerText = 'Remover'

    buttonRemove.addEventListener('click', function (event) {

        contarFruta--
        document.querySelector('#qtde-fruits-carrinho').innerHTML = contarFruta;

        let idBotao = event.target.id
        let idBotaoRemove = Number(idBotao.substring(11))

        let fruta = procurarFruta(idBotaoRemove)

        totalCarrinho -= fruta.price

        let totalCompra = document.querySelector('#total-fruits-carrinho')

        totalCompra.innerText = formatPrice(totalCarrinho)

        let li = document.querySelector('#fruitCarrinho_' + fruta.id)
        li.remove()

    })

    //4) VICULAR AS TAGS DO TEMPLATE HIERARQUICAMENTE 
    liCarrinho.append(figureCarrinho, divInfoCompra)
    figureCarrinho.appendChild(imgCarrinho)
    divInfoCompra.append(nameFruitCarrinho, priceFruitCarrinho, buttonRemove)

    //5) PENDURAR A TAG LI À TAG UL (#fruits-vitrine)
    const listaFrutasCarrinho = document.querySelector('#fruits-carrinho').appendChild(liCarrinho)

    return listaFrutasCarrinho

}

function formatPrice(value) {

    let priceFormatted = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return priceFormatted
}

let linksMenu = document.querySelectorAll('.link-menu')

for (let i = 0; i < linksMenu.length; i++) {

    let filtrarLinks = linksMenu[i]

    if (filtrarLinks.id == 'link-todas') {

        filtrarLinks.addEventListener('click', function () {
        criarVitrine(frutas)

        })
    } else {
        filtrarLinks.addEventListener('click', function (event) {

            let linkBotao = event.target.id
  
            let idLink = (linkBotao.substring(5))     

            let categoria = procurarPorCategoria(idLink)
          
            criarVitrine(categoria)
        })
    }
}


function procurarPorCategoria(idLink) {
    let todasFrutas = []
    for (let i = 0; i < frutas.length; i++) {

        for (let j = 0; j < frutas[i].categoria.length; j++) {
            if (frutas[i].categoria[j] == idLink) {
                todasFrutas.push(frutas[i])
            }
        }
    }
    return todasFrutas
}


const filterNameFruit = () => {

    let input = document.querySelector('#input-pesquisa-fruta') 

    let filterInput = frutas.filter(fruta => fruta.name.toLowerCase() == input.value.toLowerCase());

    criarVitrine(filterInput)
}

document.querySelector('#button-pesquisa-fruta').addEventListener('click', filterNameFruit)



