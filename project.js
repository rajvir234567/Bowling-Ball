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
                ball.setAttribute("velocity", direction.multiplyScalar(-10));
                ball.setAttribute("dynamic-body", {shape: "sphere", mass: "0"})
                ball.addEventListener("collide", this.removeBall)
                var scene = document.querySelector("#scene")
                scene.appendChild(ball)
            }
        })
    },
    removeBall: function (e) {
        console.log(e.detail.target.el);
        console.log(e.detail.body.el);
        var ball_el = e.detail.target.el
        var elementHit = e.detail.body.el
        if (elementHit.id.includes("pin")) {
          elementHit.setAttribute("material", {opacity: 0.6, transparent: true})
          var impulse = new CANNON.Vec3(-2, 2, 1)
          var point = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
          elementHit.body.applyImpulse(impulse, point)
          ball_el.removeEventListener("collide", this.shoot)
          var scene = document.querySelector("#scene");
          scene.removeChild(ball_el);
      }
    }
})
