// --- STYLES ---

import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItem } from "../store/cartItemState";
import { useState } from "react";
import { isModalOpen } from "../store/modal";

// Styles for the overall page layout
const pageStyles = {
    background: {
        backgroundColor: '#EAEDED',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    container: {
        display: 'flex',
        flexDirection: 'row', // Default, but good to be explicit
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    leftColumn: {
        flex: '0 0 70%', // Takes 70% of the space
    },
    rightColumn: {
        flex: '1', // Takes the remaining space
        // marginTop: "43px",
        marginLeft: "25px",
    },
};

// Styles for the main cart contents (left column)
const cartStyles = {
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#0F1111',
        margin: '0 0 10px 0',
        marginLeft: "9.75vw",
        marginBottom: "21px",
    },
    box: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #DDD',
        borderRadius: '4px',
        padding: '20px',
    },
};

// Styles for a single cart item
const itemStyles = {
    container: {
        display: 'flex',
        gap: '15px',
        borderBottom: '1px solid #DDD',
        padding: '20px 0',
    },
    // Utility style to remove padding/border for the last item
    lastItem: {
        borderBottom: 'none',
        paddingBottom: 0,
    },
    imageBox: {
        width: '120px',
        height: '120px',
        backgroundColor: '#F7F7F7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        flexShrink: 0,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    details: {
        flex: 1, // Takes up remaining space
    },
    title: {
        fontSize: '18px',
        color: '#0F1111',
        fontWeight: 'normal',
        margin: '0 0 5px 0',
    },
    stock: {
        fontSize: '14px',
        color: '#007600',
        margin: '0 0 10px 0',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    quantityBox: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #AAA',
        borderRadius: '4px',
        backgroundColor: '#F0F2F2',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    quantityButton: {
        background: 'transparent',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#555',
    },
    quantityDisplay: {
        padding: '5px 10px',
        fontSize: '14px',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #AAA',
        borderRight: '1px solid #AAA',
    },
    deleteLink: {
        color: '#007185',
        fontSize: '14px',
        cursor: 'pointer',
        borderLeft: '1px solid #DDD',
        paddingLeft: '10px',
        marginLeft: '2px', // Small space before the border
        border: "none",
        background: "none",
    },
    price: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#0F1111',
        whiteSpace: 'nowrap',
    },
};

// Styles for the order summary (right column)
const summaryStyles = {
    box: {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '4px',
        border: '1px solid #DDD',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0 0 15px 0',
        color: '#0F1111',
    },
    line: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        margin: '10px 0',
        color: '#0F1111',
    },
    totalLine: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '18px',
        fontWeight: '650',
        color: '#000000ff', // Amazon's red price color
        borderTop: '1px solid #DDD',
        paddingTop: '10px',
        marginTop: '10px',
    },
    button: {
        backgroundColor: '#FFD814',
        color: '#0F1111',
        border: '1px solid #FCD200',
        borderRadius: '8px',
        padding: '12px',
        width: '100%',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: '10px',
    },
};

// --- NEW STYLES for the Modal ---
const modalStyles = {
    // The dark background overlay
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    // The white modal box
    modal: {
        backgroundColor: '#FFFFFF',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        width: '400px',
    },
    icon: {
        width: '60px',
        height: '60px',
        marginBottom: '15px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 10px 0',
    },
    message: {
        fontSize: '16px',
        color: '#555',
        margin: '0 0 20px 0',
    },
    total: {
        fontSize: '16px',
        margin: '20px 0',
    },
    button: {
        backgroundColor: '#2563EB', // Blue color from image
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '12px 0',
        width: '100%',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

// --- COMPONENT ---

export function AmazonCartComponent() {

    const modalOpen = useRecoilValue(isModalOpen)
    const setIsModalOpen = useSetRecoilState(isModalOpen)

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div style={pageStyles.background}>
                <h1 style={cartStyles.title}>Shopping Cart</h1>
                <div style={pageStyles.container}>

                    {/* Left Column: Cart Items */}
                    <div style={pageStyles.leftColumn}>
                        <div style={cartStyles.box}>
                            <CartItemElements />
                        </div>
                    </div>
                    {/* Right Column: Order Summary */}
                    <OrderComponent />
                </div>
            </div>
            <PurchaseSuccessModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}

function CartItemComponent({ imageUrl, title, price }) {

    const setCartItems = useSetRecoilState(cartItem)
    const cartItems = useRecoilValue(cartItem)

    const [itemCount, setItemCount] = useState(1)

    function deleteItem() {
        const updatedCartItems = cartItems.filter(item => item.title !== title);
        setCartItems(updatedCartItems)
    }

    return (
        <>
            <div style={itemStyles.container}>
                <div style={itemStyles.imageBox}>
                    <img
                        src={imageUrl}
                        alt={title}
                        style={itemStyles.image}
                    />
                </div>
                <div style={itemStyles.details}>
                    <h2 style={itemStyles.title}>{title}</h2>
                    <p style={itemStyles.stock}>In stock</p>
                    <div style={itemStyles.controls}>
                        <div style={itemStyles.quantityBox}>
                            <button onClick={() => { setItemCount(c => c - 1) }} style={itemStyles.quantityButton}>-</button>
                            <span style={itemStyles.quantityDisplay}>{itemCount}</span>
                            <button onClick={() => { setItemCount(c => c + 1) }} style={itemStyles.quantityButton}>+</button>
                        </div>
                        <button onClick={deleteItem} style={itemStyles.deleteLink}>Delete</button>
                    </div>
                </div>
                <p style={itemStyles.price}>${price}</p>
            </div>
        </>
    )
}

function CartItemElements() {
    const cartItems = useRecoilValue(cartItem)

    const cartItemSingleElement = cartItems.map(item => <CartItemComponent
        imageUrl={item.imageUrl}
        title={item.title}
        price={item.price}
    />)

    return (
        <>
            {cartItemSingleElement}
        </>
    )
}

function OrderComponent() {
    // NEW: State to manage the modal's visibility
    const setIsModalOpen = useSetRecoilState(isModalOpen)

    // --- HANDLERS ---
    // NEW: Function to open the modal
    const handleProceedToBuy = () => {
        setIsModalOpen(true);
    };

    // NEW: Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cartItems = useRecoilValue(cartItem)

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <div style={pageStyles.rightColumn}>
                <div style={summaryStyles.box}>
                    <h2 style={summaryStyles.title}>Order Summary</h2>
                    <div style={summaryStyles.line}>
                        <p>Items ({cartItems.length}):</p>
                        <p>{totalPrice}</p>
                    </div>
                    <div style={summaryStyles.line}>
                        <p>Discount:</p>
                        <p>25%</p>
                    </div>

                    {/* You could add more lines here for shipping, taxes, etc. */}
                    <div style={summaryStyles.totalLine}>
                        <p>Order Total:</p>
                        <p>{totalPrice - totalPrice * 25 / 100}</p>
                    </div>
                    <button onClick={handleProceedToBuy} style={summaryStyles.button}>Proceed to Buy</button>
                </div>
            </div>
        </>
    )
}

function PurchaseSuccessModal({ isOpen, onClose }) {
    const cartItems = useRecoilValue(cartItem)

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (totalPrice === 0) {
        return null
    }

    // If not open, render nothing
    if (!isOpen) {
        return null;
    }

    return (
        // The dark overlay
        <div style={modalStyles.backdrop} onClick={onClose}>
            {/* The white modal box */}
            {/* We stop click propagation so clicking the box doesn't close it */}
            <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Green Checkmark SVG Icon */}
                <svg
                    style={modalStyles.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="10" fill="#4CAF50"></circle>
                    <path
                        d="M9 12.5L11 14.5L15 10.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>

                <h1 style={modalStyles.title}>Purchase Successful!</h1>
                <p style={modalStyles.message}>
                    Thank you for your purchase. Your order has been successfully
                    processed.
                </p>
                <p style={modalStyles.total}>
                    <strong>Total Amount: ${totalPrice - totalPrice * 25 / 100}</strong>
                </p>
                <button style={modalStyles.button} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}