class App4 {
    constructor() {
        this.taskList = [];
        this.appStorage = new AppStorage4();
        this.toDoList = document.getElementById('toDoList');
        this.titleInp = document.getElementById('titleInp');
        this.contentInp = document.getElementById('contentInp');
        this.colorSelect = document.getElementById('colorSelect');
        this.addButton = document.getElementById('addButton');
        this.addButton.addEventListener('click', () => this.clickAddTask(), false);
        this.displayTasks();
    }
    clickAddTask() {
        const title = this.titleInp.value;
        const content = this.contentInp.value;
        const color = this.colorSelect.options[this.colorSelect.selectedIndex].text;
        this.appStorage.saveToLocalStorage({
            title,
            content,
            isPinned: false,
            color,
            date: new Date(),
        });
        console.log(this.taskList);
        setTimeout(() => this.displayTasks(), 500);
    }
    openModal(taskIndex) {
        if (document.getElementById('modal'))
            document.getElementById('modal').outerHTML = '';
        const list = this.appStorage.getFromLocalStorage('todo');
        const taskList = JSON.parse(list) || [];
        const task = taskList[taskIndex];
        const { title, color, content } = task;
        const divwrapper = document.createElement('div');
        divwrapper.className = 'divwrapper';
        divwrapper.id = 'modal';
        const div = document.createElement('div');
        div.className = 'modal';
        const titleEl = document.createElement('input');
        titleEl.id = 'modal-title';
        titleEl.defaultValue = title;
        const contentEl = document.createElement('textarea');
        contentEl.defaultValue = content;
        contentEl.id = 'modal-content';
        const colorEl = document.createElement('select');
        colorEl.name = 'changeColors';
        colorEl.id = 'modal-color';
        let colorHTML = '';
        ['red', 'yellow', 'green', 'blue', 'gray'].map(c => {
            colorHTML += `<option ${color === c ? 'selected' : ''} value="${c}" class="${c}">${c}</option>`;
        });
        colorEl.innerHTML = colorHTML;
        const saveButton = document.createElement('button');
        saveButton.textContent = 'save';
        saveButton.onclick = () => this.updateTask(taskIndex);
        div.appendChild(titleEl);
        div.appendChild(contentEl);
        div.appendChild(colorEl);
        div.appendChild(saveButton);
        divwrapper.appendChild(div);
        document.body.appendChild(divwrapper);
    }
    updateTask(taskIndex) {
        const list = this.appStorage.getFromLocalStorage('todo');
        this.appStorage.removeAll('todo');
        const title = document.getElementById('modal-title');
        const content = document.getElementById('modal-content');
        const colorSelect = document.getElementById('modal-color');
        const color = colorSelect.options[colorSelect.selectedIndex].text;
        const taskList = JSON.parse(list) || [];
        const newTaskList = taskList.map((task, index) => {
            if (taskIndex === index) {
                task = Object.assign(Object.assign({}, task), { title: title.value, content: content.value, color });
            }
            return task;
        });
        this.appStorage.removeAll('todo');
        this.appStorage.saveArrayToLocalStorage(newTaskList);
        if (document.getElementById('modal'))
            document.getElementById('modal').outerHTML = '';
        setTimeout(() => this.displayTasks(), 500);
    }
    pinDownTask(taskIndex) {
        const list = this.appStorage.getFromLocalStorage('todo');
        this.appStorage.removeAll('todo');
        const taskList = JSON.parse(list) || [];
        const newTaskList = taskList.sort(this.sortByPinned).map((task, index) => {
            if (taskIndex === index) {
                task = Object.assign(Object.assign({}, task), { isPinned: !task.isPinned });
            }
            return task;
        });
        this.appStorage.removeAll('todo');
        this.appStorage.saveArrayToLocalStorage(newTaskList);
        setTimeout(() => this.displayTasks(), 500);
    }
    deleteTask(id) {
        const list = this.appStorage.getFromLocalStorage('todo');
        this.appStorage.removeAll('todo');
        const taskList = JSON.parse(list) || [];
        const filtredTaskList = taskList.filter((item, index) => index !== id);
        this.appStorage.saveArrayToLocalStorage(filtredTaskList);
        setTimeout(() => this.displayTasks(), 500);
    }
    sortByPinned(a, b) {
        return b.isPinned - a.isPinned;
    }
    displayTasks() {
        console.log('displaytask');
        const list = this.appStorage.getFromLocalStorage('todo');
        console.log(list, 'list');
        console.log(typeof list, 'typeOfList');
        const taskList = JSON.parse(list) || [];
        this.toDoList.innerHTML = '';
        console.log(this.taskList);
        taskList.sort(this.sortByPinned).map(({ title, content, isPinned, color, date, }, index) => {
            console.log(title);
            const div = document.createElement('div');
            div.onclick = () => this.openModal(index);
            const titleEl = document.createElement('h3');
            titleEl.textContent = title;
            titleEl.className = color;
            const contentEl = document.createElement('div');
            contentEl.textContent = content;
            const colorEl = document.createElement('div');
            colorEl.textContent = color;
            const dateEl = document.createElement('div');
            dateEl.textContent = date;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Del';
            deleteBtn.onclick = () => this.deleteTask(index);
            const pinBtn = document.createElement('button');
            pinBtn.textContent = 'Pin';
            pinBtn.onclick = () => this.pinDownTask(index);
            const isPinnedEl = document.createElement('div');
            isPinnedEl.textContent = isPinned ? 'pinowany' : '';
            div.appendChild(titleEl);
            div.appendChild(contentEl);
            div.appendChild(colorEl);
            div.appendChild(isPinnedEl);
            div.appendChild(dateEl);
            div.appendChild(deleteBtn);
            this.toDoList.appendChild(div);
            this.toDoList.appendChild(pinBtn);
        });
    }
}
class AppStorage4 {
    saveToLocalStorage(value) {
        const list = this.getFromLocalStorage('todo');
        const taskList = JSON.parse(list) || [];
        taskList.push(value);
        localStorage.setItem('todo', JSON.stringify(taskList));
    }
    saveArrayToLocalStorage(value) {
        localStorage.setItem('todo', JSON.stringify(value));
    }
    getFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
    removeAll(key) {
        localStorage.removeItem(key);
    }
}
const startApp4 = new App4();
//tsc lab4/SRC/code.ts --outDir lab4/build --target ES2017
