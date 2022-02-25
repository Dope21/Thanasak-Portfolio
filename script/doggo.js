        import THREE from './three';
        import {GLTFLoader} from './GLTFLoader';
        import { OrbitControls } from './OrbitControls';

        function easeOutCirc(x) {
            return Math.sqrt(1 - Math.pow(x - 1, 4))
        }
        var initialCameraPosition = new THREE.Vector3(
                20 * Math.sin(0.2 * Math.PI),
                10,
                20 * Math.cos(0.2 * Math.PI)
        )
        var target = new THREE.Vector3(-0.5, 1.2, 0)

        const container = document.querySelector('.doggo')
        window.onresize = () => {
            
        }
        // document.body.appendChild( container );
        const scW = container.clientWidth
        const scH = container.clientHeight

        const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.setSize(scW,scH);
        container.appendChild(renderer.domElement);

        const scale = scH * 0.005 + 4.8
        const camera = new THREE.OrthographicCamera(
            -scale,
            scale,
            scale,
            -scale,
            0.1,
            50000
        )
        camera.position.copy(initialCameraPosition)
        camera.lookAt(target)

        const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
        scene.add(ambientLight);

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.autoRotate = true
        controls.target = target

        var loader = new GLTFLoader();
        var obj;
        loader.load('./dog.glb', (gltf)=>{
            obj = gltf.scene;
            scene.add(gltf.scene);
        });
        // scene.background = new THREE.Color(0xffffff);
        let req = null;
        let frame = 0;
        function animate(){
            req = requestAnimationFrame(animate)

            frame = frame <= 100 ? frame + 1 : frame

            if (frame <= 100) {
            const p = initialCameraPosition
            const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

            camera.position.y = 10
            camera.position.x =
                p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
            camera.position.z =
                p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
            camera.lookAt(target)
            } else {
                controls.update()
            }
            renderer.render(scene, camera)
        }
        animate();

        window.addEventListener( 'resize', onWindowResize, false );
        function onWindowResize(){
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( container.clientWidth, container.clientHeight );

        }