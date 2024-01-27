class MyTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
  }

  // Сеттер для установки данных дерева
  set treeData(data) {
    this.renderTree(data);
  }

  // Функция для создания HTML-структуры дерева из объекта
  createTreeFromObject(data, basePath = '') {
    return Object.entries(data).map(([key, value]) => {
      const path = basePath + key; // Путь до текущего элемента
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Если значение является объектом, рендерю папку
        return `<my-folder class="my-folder" data-path="${path}/">${this.createTreeFromObject(value, path + '/')}</my-folder>`;
      } else {
        // Иначе файл
        return `<my-file class="my-file" data-path="${path}"></my-file>`;
      }
    }).join('');
  }

  // Функция для рендеринга дерева
  renderTree(data) {
    if (!Array.isArray(data)) return;
    data = data[0]; // Работаем с первым элементом массива

    this.shadowRoot.innerHTML = `<ul>${this.createTreeFromObject(data)}</ul>`;
  }
}

class MyFolder extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // вызывается при присоединении компонента к домук
  connectedCallback() {
    this.renderFolder();
  }

  renderFolder() {
    const path = this.getAttribute('data-path'); // Получаю путь из атрибута
    this.shadowRoot.innerHTML = `<li>${path}<ul><slot></slot></ul></li>`;
  }
}

class MyFile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
  }

  connectedCallback() {
    const path = this.getAttribute('data-path'); 
    this.shadowRoot.innerHTML = `<li>${path}</li>`;
  }
}

// Регистрирую кастомные элементов
customElements.define('my-tree', MyTree);
customElements.define('my-folder', MyFolder);
customElements.define('my-file', MyFile);