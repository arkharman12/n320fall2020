class VendingMachine {
    constructor() {
        this.snickers = 9
        this.kitkat = 15
        this.lays = 5
    }

    // method for rendering the html
    render() {
        return `
            <div>Snickers: ${this.snickers}</div>
            <div>KitKat: ${this.kitkat}</div>
            <div>Lay's: ${this.lays}</div>
        `
    }

    // method for buying the snickers
    buySnickers() {
        if(this.snickers > 0) {
            this.snickers--
        } else {
            this.render()
            alert("Snickers are out of stock :(")
        }
    }
    
    // method for buying the kitkat
    buyKitkat() {
        if(this.kitkat > 0) {
            this.kitkat--
        } else {
            this.render()
            alert("KitKats are out of stock :(")
        }
    }
    
    // method for buying lays
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
// call the render on the machine so we can see the output on the page
machineDiv.innerHTML = aVendingMachone.render()

// main method for running the vending machine with button id
function runMachine(clickedId) {
    // if bought snickers
    if(clickedId == "snickers") {
        aVendingMachone.buySnickers()
    } else if(clickedId == "kitkat") { // if bought kitkat
        aVendingMachone.buyKitkat()
    } else { // if bought lays
        aVendingMachone.buyLays()
    }

    // render the page everytime something is bought
    machineDiv.innerHTML = aVendingMachone.render()
}