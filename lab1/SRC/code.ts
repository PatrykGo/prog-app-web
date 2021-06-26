class App1 {

    inputAmoElem: HTMLInputElement;
    sumInput: HTMLInputElement;
    avgInput: HTMLInputElement;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;
    generateInp: GenerateInp;
    generateInpBtn: HTMLButtonElement;
    valuesCon: HTMLDivElement;

    constructor() {
        this.inputAmoElem = <HTMLInputElement>document.getElementById('inputAmountOfValues');
        this.generateInpBtn = <HTMLButtonElement>document.getElementById('generateInpBtn');
        this.generateInpBtn.addEventListener('click', () => this.generateInp.createInpArrey(this.inputAmoElem.value), false);
        this.valuesCon = <HTMLDivElement>document.getElementById('valuesContainer');
        this.generateInp = new GenerateInp(this.valuesCon);
    }

    show() {
        console.log(this.inputAmoElem.value)
    }

}

class GenerateInp {
    valuesCon: HTMLDivElement;
    generatedInpList: string[];

    constructor(valuesCon: HTMLDivElement) {
        this.valuesCon = valuesCon;
    }

    createInpArrey(howMany: string) {
        const howManyNum = parseInt(howMany)
        this.generatedInpList = [];
        for (let i = 0; i < howManyNum; i++) {
            this.generatedInpList.push(i.toString());
        }
        this.generateInputs();
    }

    generateInputs() {
        this.valuesCon.innerHTML = '';
        this.generatedInpList.map((inp, index) => {
            const div = document.createElement('div');
            const buttonDel = document.createElement('button')
            buttonDel.textContent = 'DEL';
            buttonDel.onclick = () => this.deleteInputs(index);
            const input = document.createElement("input");
            input.setAttribute('value', `${index + 1}`);
            input.onchange = () => this.generateStats();
            div.setAttribute('id', inp)
            div.appendChild(input);
            div.appendChild(buttonDel);
            this.valuesCon.appendChild(div);
        })
    }

    deleteInputs(input) {
        document.getElementById(input).outerHTML = '';
        this.generateStats();
    }

    generateStats() {
        console.log('stats');
        const sum = this.sum();
        document.getElementById('sum').textContent = sum;
        const med = this.med();
        document.getElementById('med').textContent = med;
        const max = this.max();
        document.getElementById('max').textContent = max;
        const min = this.min();
        document.getElementById('min').textContent = min;
    }

    sum() {
        let suma = 0;
        const arrayList = [...this.valuesCon.children];
        arrayList.forEach(div => {
            const value = parseInt(div.getElementsByTagName('input')[0].value);
            suma += value;
        })
        return suma.toString();
    }

    med() {
        let medium = 0;
        let suma = 0;
        const arrayList = [...this.valuesCon.children];
        arrayList.forEach(div => {
            const value = parseInt(div.getElementsByTagName('input')[0].value);
            suma += value;
        })
        medium = suma / arrayList.length;
        return medium.toString();
    }

    max() {
        let maximum = 0;
        const arrayList = [...this.valuesCon.children];
        const list = arrayList.map(div => {
            const value = parseInt(div.getElementsByTagName('input')[0].value);
            return value;
        })
        maximum = Math.max(...list);
        return maximum.toString();
    }

    min() {
        let minimum = 0;
        const arrayList = [...this.valuesCon.children];
        const list = arrayList.map(div => {
            const value = parseInt(div.getElementsByTagName('input')[0].value);
            return value;
        })
        minimum = Math.min(...list);
        return minimum.toString();
    }
}

const statApp = new App1();
//tsc lab1/SRC/code.ts --outDir lab1/build --target ES2017