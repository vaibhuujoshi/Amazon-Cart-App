import { atom } from "recoil";

export const wishItem = atom({
    key: "wishItem",
    default: [
        {
            imageUrl: 'https://images-cdn.ubuy.co.in/6694eac1733ff6439d0c77e3-french-english-computer-keyboard.jpg',
            title: 'Keyboard',
            price: 858
        },
        {
            imageUrl: 'https://m.media-amazon.com/images/I/51IJaPqwQ0S.jpg',
            title: 'USB-C Adapter',
            price: 252
        },
        {
            imageUrl: 'https://alogic.in/cdn/shop/files/ClarityMax32_UHD4KMonitorwith65WPowerDelivery_v1_1.webp?v=1723102737&width=2048',
            title: 'Computer Monitor',
            price: 2569
        },
        {
            imageUrl: 'https://rukminim2.flixcart.com/image/480/480/kpbipow0/mouse/r/b/u/mx-master-3-mouse-logitech-original-imag3h2mzrepmhys.jpeg?q=90',
            title: 'Mouse',
            price: 652
        },
        {
            imageUrl: 'https://m-cdn.phonearena.com/images/phones/85526-940/Apple-iPhone-17-Pro-Max.jpg?w=1',
            title: 'iPhone',
            price: 2253
        },
        {
            imageUrl: 'https://m.media-amazon.com/images/I/71n-nB3ZyML.jpg',
            title: 'Scorpion Gaming Chair',
            price: 3654
        },
        {
            imageUrl: 'https://png.pngtree.com/png-vector/20250205/ourmid/pngtree-natural-and-realistic-grass-design-illustration-png-image_15383733.png',
            title: 'Grass',
            price: 365452
        },
    ]
})