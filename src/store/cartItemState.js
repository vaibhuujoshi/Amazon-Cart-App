import { atom } from "recoil";

export const cartCounter = atom({
    key: "cartCounter",
    default: 0
})

export const cartItem = atom({
    key: "cartItems",
    default: []
})