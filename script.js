class Item {
    #id;
    #name;
    #age;

    constructor(id, name, age) {
        this.#id = id;
        this.#name = name;
        this.#age = age;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getAge() {
        return this.#age;
    }
}

class ItemsManager {
    #items;
    #globalId;

    constructor() {
        this.#items = [];
        this.#globalId = 0;
    }

    addNew(id,name, age) {
        this.#globalId++;
        let item = new Item(id,name, age);

        this.#items.push(item);
    }

    getAll() {
        return this.#items;
    }

    deleteById(id) {
        let findIndex = this.#items.findIndex(item => {
            return item.getId() === id;
        });
        this.#items.splice(findIndex,1);
    }
}

function buttonAddItem_Click(){
    let age = inputNumber.value;
    let name = inputText.value;


    if (age < 0){
     alert("ALERT")
     return;
    }
    if (name.length < 3){
        alert("ALERT NAME")
        return;
    }
    showItems();
}

function buttonDeleteItem_Click(id) {
    itemsManager.deleteById(id);
    showItems();
}

let itemsManager = new ItemsManager();

let inputNumber = document.getElementById("input-number");
let inputText = document.getElementById("input-text");
let tableItems = document.getElementById("tableItems");

function showItems() {
    let html = "";

    html += <table class="table">;
        html += `
        <thead>
        <tr>
            <th>лет</th>
            <th>имя</th>
        </tr>
        </thead>
        `;
        html += <tbody>;

            itemsManager.getAll().forEach(item) =>{
            html += `<tr>
                <td>${item.getAge()}</td>
                <td>${item.getName()}</td>
                
                <td><button class="btn btn-danger" onclick="buttonAddItem_Click(${item})">удалить</button></td>
            </tr>`
        });

        html += </tbody>;
        html += </table>;


    tableItems.innerHTML = html;
}

window.onload = async function () {

    let response = await fetch("http://localhost:8080/first");

    if (response.ok) {
        let items = await response.json();

        console.log(items);

        items.forEach(item => {
            itemsManager.addNew();
        });

        showTodoItems();
    }
};