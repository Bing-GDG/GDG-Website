import * as THREE from 'three';
import { component } from "../type_magic";

/// A ThreeObject component must be used in conjunction with a Transform3d component.
/// The mesh object must not be reassigned. Instead, modify properties of the mesh object.
/// `mesh` must be initialized before adding this as a component.
export type ThreeObject = {
    mesh: THREE.Mesh;
}

export const ThreeObject = component<ThreeObject>("ThreeObject");

/// A ThreeCamera component must be used in conjunction with a Transform3d component.
/// `camera` must be initialized before adding this as a component.
/// TODO! this is consumed as a singleton component
export type ThreeCamera = {
    camera: THREE.PerspectiveCamera;
}

export const ThreeCamera = component<ThreeCamera>("ThreeCamera");
