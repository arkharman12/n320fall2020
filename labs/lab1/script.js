let drops = []
let bgColor = (11, 5, 30)
let blueGround 

function setup() {
    createCanvas(800, 600)
    
    // create 100 new raindrops
    for (let i = 0; i < 100; i++) {
        drops[i] = new Rain(random(width), random(0, -3000))
    }

    // create new ground
    blueGround = new Ground()
}

function draw() {
    background(bgColor)

    // run these two functions for every single drop
    for (let i = 0; i < drops.length; i++) {
        drops[i].rainFall()
        drops[i].rainSplash()
    }

    // make the ground
    blueGround.ground()

}

class Ground {
    constructor() {
        this.r = 0
        this.g = 0
        this.b = 255
    }

    ground() {
        // Initial ground opacity with 5% (12.75) of 255
        fill(this.r, this.g, this.b, 12.75)
        noStroke()
        rect(0, 545, 800, 58)
    }
}

class Rain {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.length = 15
        this.r = 0
        this.opacity = 200
        this.speed = random(4, 10)
    }

    rainFall() {
        // no outline
        noStroke()
        // raindrop color
        fill(159, 236, 245)
        // make the drops fall
        this.y = this.y + this.speed 
        // ellipse like raindrop
        ellipse(this.x, this.y, 3, this.length)

        // make the raindrops disappear as soon as they hit the ground
        if (this.y > 540) {
            this.length = 0
        }
    }

    rainSplash() {
        // outline for raindrop splash 
        stroke(245, this.opacity)
        // no fill
        noFill()

        if (this.y > 565) {
            // raindrop splash effect using an ellipse
            ellipse(this.x, 565, this.r * 2, this.r / 2)
            // keep making the raindrop splashes
            this.r++
            // make the raindrop splash go away
            this.opacity = this.opacity - 10

            // keep the rain dropping from top
            if (this.opacity < 0) {
                this.y = random(0, -100)
                this.length = 15
                this.r = 0
                this.opacity = 200
            }

            /* the idea behind these if statements is that increase the
                ground opacity by some % when new 10 drops added to the drops array above */

            // starting from 10 because I already covered the initial ground state in ground class
            if (drops.length > 10) {
                noStroke()
                // 25.5 is 10% of 255
                fill(0, 0, 255, 25.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 20) {
                noStroke()
                // 51 is 20% of 255
                fill(0, 0, 255, 51)
                rect(0, 545, 800, 58)
            } else if (drops.length > 30) {
                noStroke()
                // 76.5 is 30% of 255
                fill(0, 0, 255, 76.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 40) {
                noStroke()
                // 102 is 40% of 255
                fill(0, 0, 255, 102)
                rect(0, 545, 800, 58)
            } else if (drops.length > 50) {
                noStroke()
                // 127.5 is 50% of 255
                fill(0, 0, 255, 127.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 60) {
                noStroke()
                // 153 is 60% of 255
                fill(0, 0, 255, 153)
                rect(0, 545, 800, 58)
            } else if (drops.length > 70) {
                noStroke()
                // 178.5 is 70% of 255
                fill(0, 0, 255, 178.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 80) {
                noStroke()
                // 204 is 80% of 255
                fill(0, 0, 255, 204)
                rect(0, 545, 800, 58)
            } else if (drops.length > 90) {
                noStroke()
                // 229.5 is 90% of 229.5
                fill(0, 0, 255, 229.5)
                rect(0, 545, 800, 58)
            } else {
                noStroke()
                // 100% opacity
                fill(0, 0, 255, 255)
                rect(0, 545, 800, 58)
            }
        }
    }
}



