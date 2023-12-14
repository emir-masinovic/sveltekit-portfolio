import * as BABYLON from '@babylonjs/core';
import * as Material from '@babylonjs/materials';
import '@babylonjs/loaders/';

export function importMesh(scene) {
	BABYLON.SceneLoader.ImportMesh('', '/', 'city.babylon', scene, function (meshes) {
		meshes.forEach((mesh) => {
			mesh.scaling = new BABYLON.Vector3(50, 50, 50);
			mesh.position.y = 40;
			mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
				mesh,
				BABYLON.PhysicsImpostor.BoxImpostor,
				{ mass: 0, friction: 0.08, restitution: 0 },
				scene
			);

			let material = new Material.GridMaterial('Ground Plane Material', scene);
			material.gridRatio = 0.05;
			material.majorUnitFrequency = 5;
			material.lineColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
			mesh.material = material;

			// const localAxes = new BABYLON.AxesViewer(scene, 1);
			// localAxes.xAxis.parent = mesh;
			// localAxes.yAxis.parent = mesh;
			// localAxes.zAxis.parent = mesh;
		});
	});
}
