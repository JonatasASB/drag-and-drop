let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
})

document.querySelector('.neutralArea')
    .addEventListener('dragover', dragOverNeutral);

document.querySelector('.neutralArea')
    .addEventListener('dragleave', dragLeaveNeutral);

document.querySelector('.neutralArea')
    .addEventListener('drop', dropNeutral);
function dragStart(event) {
    event.currentTarget.classList.add('dragging');
}

function dragEnd(event) {
    event.currentTarget.classList.remove('dragging');
}

function dragOver(event) {
    if (event.currentTarget.querySelector('.item') === null) {
        event.preventDefault();
        event.currentTarget.classList.add('hover')
    }
}

function dragLeave(event) {
    event.currentTarget.classList.remove('hover');
}

function drop(event) {
    event.currentTarget.classList.remove('hover');

    if (event.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        dragItem.classList.add('dropped');
        event.currentTarget.appendChild(dragItem);

        updateAreas();
    }
}

function dragOverNeutral(event) {
    event.preventDefault();
    event.currentTarget.classList.add('hover');


}
function dragLeaveNeutral(event) {
    event.currentTarget.classList.remove('hover')


}

function dropNeutral(event) {
    event.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    event.currentTarget.appendChild(dragItem)
    dragItem.classList.remove('dropped');

    updateAreas();
}

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