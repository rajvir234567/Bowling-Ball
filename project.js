AFRAME.registerComponent("project",{
    init: function(){
        this.shoot()
    },
    shoot: function(){
        window.addEventListener("keydown", (k)=>{
            if(k.key === "z"){
                var ball = document.createElement("a-entity")
                ball.setAttribute("material", "color", "black")
                ball.setAttribute("geometry", {primitive: "sphere", radius: 0.1})
                var camera = document.querySelector("#camera")
                var cposition = camera.getAttribute("position")
                ball.setAttribute("position", {x:cposition.x, y: 1.2, z:cposition.z})
                var cam = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                cam.getWorldDirection(direction)
                ball.setAttribute("velocity", direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene")
                scene.appendChild(ball)
            }
        })
    }
})