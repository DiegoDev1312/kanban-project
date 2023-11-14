const kanbanColumns = document.querySelectorAll('[data-kanban-column]');
const createTaskButton = document.querySelector('[data-create-task-button]');
const addNewTaskButton = document.querySelector('[data-add-task-button]');
const modalArea = document.querySelector('[data-modal-area]');
const addNewCardButton = document.querySelector('[data-add-card-button]');
const modalCardArea = document.querySelector('[data-modal-card-area]');
const createNewCardButton = document.querySelector('[data-create-card-button]');
const kanbanArea = document.querySelector('[data-kanban-area]');

function handleDragOver(event) {
    event.preventDefault();
}

function handleDragStart(event) {
    const dragId = event.target.attributes['data-kanban-card-id'].value;
    event.dataTransfer.setData('div', dragId);
}

function handleAddCard() {
    const cardInputs = document.querySelectorAll('[data-input-card]');
    let cardH1 = '';
    let cardBorderColor = '';

    for (let input of cardInputs) {
        if (input.attributes['data-input-card'].value === 'title') {
            cardH1 = input.value;
        } else {
            cardBorderColor = input.value
        }
    }

    const cardTitle = document.createElement('h1');
    const createNewCard = document.createElement('div');
    cardTitle.innerHTML = cardH1;

    createNewCard.setAttribute('data-kanban-column', '');
    createNewCard.classList.add('card-column');
    createNewCard.style.borderColor = cardBorderColor;
    createNewCard.appendChild(cardTitle);
    createNewCard.addEventListener('drop', handleDrop);
    createNewCard.addEventListener('dragover', handleDragOver);

    kanbanArea.appendChild(createNewCard);
    hideCardModal();
}

function handleDrop(event) {
    event.preventDefault();
    if (event.target.attributes['data-kanban-column']) {
        const kanbanCard = document.querySelectorAll('[data-kanban-card-id]');

        const data = event.dataTransfer.getData('div');
        const kanbanElement = [...kanbanCard].find((kanban) =>
            kanban.attributes['data-kanban-card-id'].value === data);
        console.log(kanbanElement);
        event.target.appendChild(kanbanElement);
    }
}

function handleCreateTaskPress() {
    const kanbanCard = document.querySelectorAll('[data-kanban-card-id]');
    const inputTaskName = document.querySelector('[data-input-task]');
    let newKanbanCard = document.createElement('div');

    newKanbanCard.innerHTML = inputTaskName.value;
    newKanbanCard.classList.add('kanban-card');
    newKanbanCard.setAttribute('data-kanban-card-id', kanbanCard.length + 1);
    newKanbanCard.setAttribute('draggable', 'true');
    newKanbanCard.addEventListener('dragstart', handleDragStart);

    inputTaskName.value = '';
    kanbanColumns[0].appendChild(newKanbanCard);
    hideModal();
}

function showModal() {
    modalArea.style.display = 'flex';
}

function hideModal() {
    modalArea.style.display = 'none';
}

function showCardModal() {
    modalCardArea.style.display = 'flex';
}

function hideCardModal() {
    modalCardArea.style.display = 'none';
}

for (let column of kanbanColumns) {
    column.addEventListener('drop', handleDrop);
    column.addEventListener('dragover', handleDragOver);
}

createTaskButton.addEventListener('click', handleCreateTaskPress);
addNewTaskButton.addEventListener('click', showModal);
addNewCardButton.addEventListener('click', showCardModal);
createNewCardButton.addEventListener('click', handleAddCard)
