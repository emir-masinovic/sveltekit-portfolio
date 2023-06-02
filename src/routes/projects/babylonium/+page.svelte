<main>
    <div id="canvasZone">
        <canvas id="renderCanvas"></canvas>
    </div>
</main>

<style>
    #canvasZone {
        width: 100vw;
        height: 90vh;
        overflow: hidden;
    }

    #renderCanvas {
        width: 100%;
        height: 100%;
        touch-action: none;
    }
</style>

<script>
    import {onMount} from 'svelte';
    import * as BABYLON from 'babylonjs';
    // import 'babylonjs-materials';
    // import 'babylonjs-loaders';
    // import 'babylonjs-post-process';
    // import 'babylonjs-procedural-textures';
    // import * as GUI from 'babylonjs-gui';
    // import * as BabylonViewer from 'babylonjs-viewer';
    // BabylonViewer.InitTags("my-tag");

    onMount(async () => {
        let canvas = document.getElementById('renderCanvas');
        let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

        let createScene = function () {
            let scene = new BABYLON.Scene(engine);
            let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
            sphere.position.y = 1;
            let ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
            return scene;
        }

        var scene = createScene();
        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });
    });
</script>
