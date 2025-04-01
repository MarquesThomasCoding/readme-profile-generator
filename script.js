const typesOfItems = {
    "md-text": {
        "type": "div",
        "attributes": {
            "contenteditable": "true",
            "class": "md-text",
        },
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
        "type": "div",
        "attributes": {
            "contenteditable": "true",
            "class": "md-h1",
        },
    },
    "md-h2": {
        "type": "div",
        "attributes": {
            "contenteditable": "true",
            "class": "md-h2",
        },
    },
    "md-h3": {
        "type": "div",
        "attributes": {
            "contenteditable": "true",
            "class": "md-h3",
        },
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
    },
    "md-repo-list": {
        "type": "img",
        "attributes": {
            "class": "md-repo-list",
            "src": "https://github-readme-stats.vercel.app/api/pin/",
            "username": "",
            "repo": "",
            "title_color": "fff",
            "icon_color": "f9f9f9",
            "text_color": "9f9f9f",
            "bg_color": "151515",
            "border_color": "303030",
        },
        "hasSettings": true,
    },
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
function changeUsername(element) {
    const parentItemSettings = element.closest('.item-settings');
    const relatedItem = document.getElementById(parentItemSettings.getAttribute('related-item'));
    const username = element.value;
    changeRepoListElement(relatedItem, username, relatedItem.getAttribute('repo'));
}

function changeRepos(element) {
    const parentItemSettings = element.closest('.item-settings');
    const relatedItem = document.getElementById(parentItemSettings.getAttribute('related-item'));
    const repo = element.value;
    changeRepoListElement(relatedItem, relatedItem.getAttribute('username'), repo);
}

function changeRepoListElement(element, username, repo) {
    element.setAttribute('username', username);
    element.setAttribute('repo', repo);
    element.src = `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo}&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515&border_color=303030`;
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
    delBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H4a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1zm1 2v1h4V5h-4zm-3 4v11h10V9H7z"/>
        </svg>
    `;

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

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const observer = new MutationObserver(() => {
        const hasResultItems = document.querySelector('.result-item') !== null;
        convertButton.disabled = !hasResultItems;
    });

    observer.observe(document.getElementById('result-ui-content'), { childList: true, subtree: true });
});