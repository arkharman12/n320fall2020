class VendingMachine {
    constructor() {
        this.snickers = 9
        this.kitkat = 15
        this.lays = 5
    }

    render() {
        return `
            <div>Snickers: ${this.snickers}</div>
            <div>KitKat: ${this.kitkat}</div>
            <div>Lay's: ${this.lays}</div>
        `
    }

    buySnickers() {
        if(this.snickers > 0) {
            this.snickers--
        } else {
            this.render()
            alert("Snickers are out of stock :(")
        }
    }
    
    buyKitkat() {
        if(this.kitkat > 0) {
            this.kitkat--
        } else {
            this.render()
            alert("KitKats are out of stock :(")
        }
    }
    
    buyLays() {
        if(this.lays > 0) {
            this.lays--
        } else {
            this.render()
            alert("Lay's are out of stock :(")
        }
    }
}

let aVendingMachone = new VendingMachine()
machineDiv.innerHTML = aVendingMachone.render()

function runMachine(clickedId) {
    if(clickedId == "snickers") {
        aVendingMachone.buySnickers()
    } else if(clickedId == "kitkat") {
        aVendingMachone.buyKitkat()
    } else {
        aVendingMachone.buyLays()
    }
    machineDiv.innerHTML = aVendingMachone.render()
}