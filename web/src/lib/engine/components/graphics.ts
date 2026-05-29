import * as THREE from 'three';

/// A ThreeObject component must be used in conjunction with a Transform3d component  
export type ThreeObject = {
    mesh: THREE.Object3D;
}