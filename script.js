//Variável que recebe as areas e seus respectivos elementos
let areas = {
    a: null,
    b: null,
    c: null
}



//Eventos


//Arrastar e soltar
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

//Clicar, arrastar e soltar
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
})

//Eventos de arrastar e soltar da neutralArea (area de baixo)
document.querySelector('.neutralArea')
    .addEventListener('dragover', dragOverNeutral);

document.querySelector('.neutralArea')
    .addEventListener('dragleave', dragLeaveNeutral);

document.querySelector('.neutralArea')
    .addEventListener('drop', dropNeutral);



//Funções


//Adiciona a classe dragging ao parametro event
function dragStart(event) {
    event.currentTarget.classList.add('dragging');
}

//Remove a classe dragging ao parametro event
function dragEnd(event) {
    event.currentTarget.classList.remove('dragging');
}

/**
 * Verifica se a area esta vazia e adiciona a classe hover ao paramentro event
 */
function dragOver(event) {
    if (event.currentTarget.querySelector('.item') === null) {
        event.preventDefault();
        event.currentTarget.classList.add('hover')
    }
}
/**
 * Remove a classe hover ao parametro event
 */
function dragLeave(event) {
    event.currentTarget.classList.remove('hover');
}

/** 
* Remove a classe hover ao parametro event
* Verifica se a area onde ocorreu o drop está vazia, adiciona a classe dropped ao elemento de dragItem e adiciona o item a área
*/
function drop(event) {
    event.currentTarget.classList.remove('hover');

    if (event.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        dragItem.classList.add('dropped');
        event.currentTarget.appendChild(dragItem);

        //Atualiza as areas
        updateAreas();
    }
}

//Funções de arrastar e soltar da neutralArea
function dragOverNeutral(event) {
    event.preventDefault();
    event.currentTarget.classList.add('hover');


}

//Remove a classe hover ao parametro event em neutralArea
function dragLeaveNeutral(event) {
    event.currentTarget.classList.remove('hover')


}

/**
 * Remove a classe hover ao parametro event
 * Adiciona o elemento de dragItem a neutralArea
 * Remove a classe dropped ao elemento de dragItem
 */
function dropNeutral(event) {
    event.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    event.currentTarget.appendChild(dragItem)
    dragItem.classList.remove('dropped');

    //Atualiza a area
    updateAreas();
}

/**
 * Percorre todas as classes area
 * name recebe o data-name de cada area
 * Verifica se a area possui algum item e adiciona o texto do item a variável areas
 * Verifica se os itens estão em posições corretas e adiciona a classe correct
 * Verifica se os itens nao estao em posicoes corretas e adiciona a classe wrong
 */
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').textContent;
        }
        else {
            areas[name] = null;
        }

        if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
            document.querySelector('.areas').classList.add('correct');
        } else {
            document.querySelector('.areas').classList.remove('correct')
        }

        if (areas.a !== null && areas.b !== null && areas.c !== null) {

            if (areas.a !== '1' || areas.b !== '2' || areas.c !== '3') {
                document.querySelector('.areas').classList.add('wrong');

            }
        } else if (areas.a === null || areas.b === null || areas.c === null) {
            document.querySelector('.areas').classList.remove('wrong');
        }
    })
}