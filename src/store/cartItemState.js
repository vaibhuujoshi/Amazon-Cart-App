import { atom } from "recoil";

export const cartCounter = atom({
    key: "cartCounter",
    default: 0
})

export const cartItems = atom({
    key: "cartItems",
    default: []
})