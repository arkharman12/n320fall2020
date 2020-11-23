let canvas = document.getElementById("render-canvas")

let engine = new BABYLON.Engine(canvas, true)

// App variables
let camera, scene, ball, goal, timeoutId, particleSystem

scene = createScene()
engine.runRenderLoop(function() {
    scene.render()
})

scene.registerAfterRender(function() {
    if(ball.intersectsMesh(goal, false)) {
        // Move goal
        goal.position.x = (Math.random() * 8) - 4

        // Play a particle burst
        particleSystem.manualEmitCount = 21
        particleSystem.start()

        // Position particles
        particleSystem.minEmitBox = ball.position

        // Put the ball back
        resetBall()
    }
})

function createScene() {
    // Basic scene setup
    let scene = new BABYLON.Scene(engine)
    camera = new BABYLON.UniversalCamera("UC", new BABYLON.Vector3(0, 0, -15), scene)
    let light = new BABYLON.DirectionalLight("lighty", new BABYLON.Vector3(0, -0.5, 1), scene)

    // Enable physics
    let gravityVector = BABYLON.Vector3(0, -9.81, 0)
    let physicsPlugin = new BABYLON.CannonJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin)

    // Setup ball
    ball = BABYLON.MeshBuilder.CreateSphere("sphero", { diameter: 1 }, scene)
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor,
                                                        { mass: 1, resititution: 0.2 },
                                                        scene)
    ball.tag = "ball"

    // Setup ground
    let ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 20 , width: 20, subdivisions: 4}, scene)
    ground.position.y = -3
    ground.position.z = 9
    ground.PhysicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor,
                                                        { mass: 0, resititution: 0.9 }, scene)

    // Make the goal
    goal = new BABYLON.MeshBuilder.CreateBox("goal", { height: 5, width: 5 }, scene)
    goal.position.z = 7
    goal.position.x = (Math.random() * 8) - 4

    // Make the particle system
    particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene)
    particleSystem.emitter = new BABYLON.Vector3(0, 0, 0)
    particleSystem.minEmitPower = 1
    particleSystem.minEmitPower = 3
    particleSystem.addVelocityGradient(0, 2)

    // Load the particle texture
    particleSystem.particleTexture = new BABYLON.Texture("images/particle.png", scene)

    return scene
}

function resetBall() {
    // Reset position
    ball.position = new BABYLON.Vector3()

    // Reset velocity
    ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3())
    ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3())

    // Get rid of the timeout if its still on
    clearTimeout(timeoutId)
}

window.addEventListener("click", function() {
    // Get the mesh that was clicked on
    let pickResult = scene.pick(scene.pointerX, scene.pointerY)
    let selectedObject = pickResult.pickedMesh

    // Null check
    if(selectedObject) {
        if(selectedObject.tag == "ball") {
            // Get a direction away from where the user clicked on the wall
            let surfaceNormal = pickResult.getNormal(true)
            let forceDirection = surfaceNormal.scale(-1000)
    
            // Kick the object
            selectedObject.physicsImpostor.applyForce(
                forceDirection,
                selectedObject.getAbsolutePosition()
            )
    
            // Reset ball after 3 seconds
            timeoutId = this.setTimeout(resetBall, 3000)
        }
    }
})
