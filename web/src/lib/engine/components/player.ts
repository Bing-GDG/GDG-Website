import { component } from "../type_magic";

export type Player = {} // empty type for now

export const Player = component<Player>("Player");

export type MainPlayer = {
    lookSensitivity: number;
    moveSpeed: number;
    jumpPower: number;
}

export const MainPlayer = component<MainPlayer>("MainPlayer");
