let drops = []
let bgColor = (11, 5, 30)

function setup() {
  createCanvas(800, 600)
  
  for (i = 0; i < 100; i++) {
    drops[i] = new Rain(random(width), random(0, -3000))
  }
}

function draw() {
    background(bgColor)

    for (i = 0; i < drops.length; i++) {
        drops[i].rainFall()
        drops[i].rainSplash()
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
        noStroke()
        fill(159, 236, 245)
        ellipse(this.x, this.y, 3, this.length)
        this.y = this.y + this.speed 
        if (this.y > 540) {
            this.length = this.length - 5
            //this.y= random(0,-100)
        }
        if (this.length < 0) {
            this.length = 0
        }
    }

    rainSplash() { 
        stroke(245, this.opacity)
        noFill()

        if (drops.length < 10) {
            noStroke()
            fill(0, 0, 255, 12.75)
            rect(0, 545, 800, 58)
        }

        if (this.y > 565) {
            ellipse(this.x, 565, this.r * 2, this.r / 2)
            
            this.r++
            this.opacity = this.opacity - 10

            // keep the rain dropping
            if (this.opacity < 0) {
                this.y = random(0, -100)
                this.length = 15
                this.r = 0
                this.opacity = 200
            }

            // change the ground color
            if (drops.length > 10) {
                noStroke()
                fill(0, 0, 255, 25.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 20) {
                noStroke()
                fill(0, 0, 255, 51)
                rect(0, 545, 800, 58)
            } else if (drops.length > 30) {
                noStroke()
                fill(0, 0, 255, 76.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 40) {
                noStroke()
                fill(0, 0, 255, 102)
                rect(0, 545, 800, 58)
            } else if (drops.length > 50) {
                noStroke()
                fill(0, 0, 255, 127.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 60) {
                noStroke()
                fill(0, 0, 255, 153)
                rect(0, 545, 800, 58)
            } else if (drops.length > 70) {
                noStroke()
                fill(0, 0, 255, 178.5)
                rect(0, 545, 800, 58)
            } else if (drops.length > 80) {
                noStroke()
                fill(0, 0, 255, 204)
                rect(0, 545, 800, 58)
            } else if (drops.length > 90) {
                noStroke()
                fill(0, 0, 255, 229.5)
                rect(0, 545, 800, 58)
            } else {
                noStroke()
                fill(0, 0, 255, 255)
                rect(0, 545, 800, 58)
            }
        }
    }
}

