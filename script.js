const typesOfItems = {
    "md-text": {
        "type": "textarea",
        "attributes": {
            "value": "Text",
            "class": "md-text",
        },
        "autoResize": true,
    },
    "md-img": {
        "type": "img",
        "attributes": {
            "class": "md-img",
            "src": "https://placehold.co/150x150",
        },
        "hasSettings": true,
    },
    "md-h1": {
        "type": "textarea",
        "attributes": {
            "value": "Heading 1",
            "class": "md-h1",
        },
        "autoResize": true,
    },
    "md-h2": {
        "type": "textarea",
        "attributes": {
            "value": "Heading 2",
            "class": "md-h2",
        },
        "autoResize": true,
    },
    "md-h3": {
        "type": "textarea",
        "attributes": {
            "value": "Heading 3",
            "class": "md-h3",
        },
        "autoResize": true,
    },
    "md-tools": {
        "type": "img",
        "attributes": {
            "class": "md-tools",
            "src": "https://go-skill-icons.vercel.app/api/icons?i=html,js,css,wasm&theme=light&perline=5",
            "icons": "html,js,css,wasm",
            "theme": "light",
            "icons-per-line": "5",
        },
        "hasSettings": true,
    }
}

const selectableItems = document.querySelectorAll('.selectable-item');
const resultUIContent = document.querySelector('.result-ui-content .drop-section');

selectableItems.forEach(item => {
    item.addEventListener('click', () => {
        let newItem = createNewItem(item);
        resultUIContent.appendChild(newItem);
    });
});

function autoResize(event) {
    const element = event.target;
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

function changeTheme(element) {
    const parentItemSettings = element.closest('.item-settings');
    const relatedItem = document.getElementById(parentItemSettings.getAttribute('related-item'));
    const theme = element.value;
    changeToolsElement(relatedItem, relatedItem.getAttribute('icons'), theme, relatedItem.getAttribute('icons-per-line'));
}

function changeIconsPerLine(element) {
    const parentItemSettings = element.closest('.item-settings');
    const relatedItem = document.getElementById(parentItemSettings.getAttribute('related-item'));
    const iconsPerLine = element.value;
    changeToolsElement(relatedItem, relatedItem.getAttribute('icons'), relatedItem.getAttribute('theme'), iconsPerLine);
}

function changeIcons(element) {
    const parentItemSettings = element.closest('.item-settings');
    const relatedItem = document.getElementById(parentItemSettings.getAttribute('related-item'));
    const icons = element.value;
    changeToolsElement(relatedItem, icons, relatedItem.getAttribute('theme'), relatedItem.getAttribute('icons-per-line'));
}

function changeToolsElement(element, icons, theme, iconsPerLine) {
    element.setAttribute('icons', icons);
    element.setAttribute('theme', theme);
    element.setAttribute('icons-per-line', iconsPerLine);
    element.src = `https://go-skill-icons.vercel.app/api/icons?i=${icons}&theme=${theme}&perline=${iconsPerLine}`;
}

function changeSrc(element) {
    const parentItemSettings = element.closest('.item-settings');
    const relatedItem = document.getElementById(parentItemSettings.getAttribute('related-item'));
    const src = element.value;
    changeImgElement(relatedItem, src);
}

function changeImgElement(element, src) {
    element.setAttribute('src', src);
    element.src = src;
}

function createNewItem(element) {
    const newItemContainer = document.createElement('div');
    newItemContainer.classList.add('result-item-container');
    newItemContainer.setAttribute('draggable', true);
    newItemContainer.setAttribute('ondragstart', 'dragstartHandler(event)');

    const type = element.getAttribute('data-type');
    const itemData = typesOfItems[type];
    const newItem = document.createElement(itemData.type);
    const id = `item-${Date.now()}`;
    newItem.id = id;
    newItem.setAttribute('draggable', false);

    itemData.attributes && Object.keys(itemData.attributes).forEach(key => {
        newItem.setAttribute(key, itemData.attributes[key]);
    });

    if (itemData.autoResize) {
        newItem.addEventListener('input', autoResize);
        autoResize({ target: newItem });
    }
    if (itemData.hasSettings) {
        newItem.addEventListener('click', () => {
            const itemSettingsTools = document.querySelector(`.item-settings[data-type="${type}"]`);
            itemSettingsTools.setAttribute('related-item', id);
            populateSettings(itemSettingsTools, newItem);
            itemSettingsTools.classList.toggle('hidden');
        });
    }

    newItem.classList.add('result-item');

    const delBtn = document.createElement('button');
    delBtn.classList.add('del-btn');
    delBtn.innerHTML = '🗑️';

    delBtn.addEventListener('click', () => {
        newItemContainer.remove();
    });

    newItemContainer.appendChild(delBtn);
    newItemContainer.appendChild(newItem);

    return newItemContainer;
}

function closeModal() {
    document.querySelector('.item-settings:not(.hidden)').classList.add('hidden');
}

function populateSettings(itemSettingsTools, relatedItem) {
    const inputs = itemSettingsTools.querySelectorAll('input');
    const selects = itemSettingsTools.querySelectorAll('select');
    const textareas = itemSettingsTools.querySelectorAll('textarea');

    inputs.forEach(input => {
        const attribute = input.getAttribute('name');
        console.log(attribute);
        input.value = relatedItem.getAttribute(attribute);
        console.log(input.value);
    });

    selects.forEach(select => {
        const attribute = select.getAttribute('name');
        select.value = relatedItem.getAttribute(attribute);
    });

    textareas.forEach(textarea => {
        const attribute = textarea.getAttribute('name');
        textarea.value = relatedItem.getAttribute(attribute);
    });
}