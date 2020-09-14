class Instrument {
    constructor(loudness, family, verb) {
        this.loudness = loudness
        this.family = family
        this.verb = verb
    }

    // I know nothing about music instruments so this is just a random console log
    playInstrument() {
        console.log(`This instrument has ${this.loudness} loudness, 
        ${this.family} family and ${this.verb} verb.`)
    }
}

let aInstrument = new Instrument(32, "Royal", "Lalala")
aInstrument.playInstrument()

class Woodwind extends Instrument {
    constructor(family, verb) {
        super(12, family, verb)
    }
}

class Percussion extends Instrument {
    constructor(family, verb) {
        super(23, family, verb)
    }
}

class Stringed extends Instrument {
    constructor(family, verb) {
        super(54, family, verb)
    }
}

let instruments = []
instruments[0] = new Woodwind("Woodwind", "blowned")
instruments[1] = new Percussion("Percussion", "chime")
instruments[2] = new Stringed("Stringed", "bass")

instruments.forEach((instrument) => {
    instrument.playInstrument()
})
