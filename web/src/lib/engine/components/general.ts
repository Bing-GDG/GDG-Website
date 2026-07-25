import { Quaternion, Vector3 } from "three";
import { component } from "../type_magic";

export type Transform3dParams = {
    position?: Vector3;
    rotation?: Quaternion;
    localScale?: Vector3;
}

/// Transform component for any system to consume. 
export class Transform3d {
    static readonly id = component<Transform3d>("Transform3d");

    constructor(params: Transform3dParams = {}) {
        this.position = params.position ?? new Vector3(0, 0, 0);
        this.rotation = params.rotation ?? new Quaternion();
        this.localScale = params.localScale ?? new Vector3(1, 1, 1);
    }

    position: Vector3;
    rotation: Quaternion;

    /// The authored size
    readonly localScale: Vector3;

    /// Essentially a scale multiplier, its named this way in case we introduce object hiearchies later
    /// (??)
    parentScale: Vector3 = new Vector3(1, 1, 1);

    // scratch buffer to reuse in place of alloc
    private _scale: Vector3 = new Vector3();

    // scale multiplied by parentScale
    get scale(): Vector3 {
        return this._scale.copy(this.localScale).multiply(this.parentScale);
    }
}
