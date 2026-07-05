import type { Quaternion, Vector3 } from "three";

export type Transform3d = {
    position: Vector3,
    rotation: Quaternion,
    scale: Vector3
}
