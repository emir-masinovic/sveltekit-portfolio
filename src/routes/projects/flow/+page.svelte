<!-- <script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let scene, camera, renderer, circle;

	onMount(() => {
		// Set up scene
		scene = new THREE.Scene();

		// Set up camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;

		// Set up renderer
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight - 80);
		document.body.appendChild(renderer.domElement);

		// Create yellow circle
		const geometry = new THREE.CircleGeometry(1, 32);
		const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
		circle = new THREE.Mesh(geometry, material);
		scene.add(circle);

		// Render the scene
		animate();
	});

	function animate() {
		requestAnimationFrame(animate);

		// Rotate the circle
		// circle.rotation.x += 0.01;
		// circle.rotation.y += 0.01;

		// Render the scene
		renderer.render(scene, camera);
	}
</script>

<style>
	canvas {
		width: 100%;
		height: calc(100vh - 80px);
	}
</style> -->
