let canvas = document.getElementById("render-canvas")

let engine = new BABYLON.Engine(canvas, true)

let camera, scene

scene = createScene()
engine.runRenderLoop(function() {
    scene.render()
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

    // Setup ground
    let ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 20 , width: 20, subdivisions: 4}, scene)
    ground.position.y = -3
    ground.position.z = 9
    ground.PhysicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor,
                                                        { mass: 0, resititution: 0.9 }, scene)

    return scene
}
