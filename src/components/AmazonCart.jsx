// --- STYLES ---

import { useRecoilValue } from "recoil";
import { cartItem } from "../store/cartItemState";

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
        fontWeight: 'bold',
        color: '#B12704', // Amazon's red price color
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

// --- COMPONENT ---

export function AmazonCartComponent() {
    // Data from the image to make the component match
    const items = {
        title: 'The Art of Impossible: A Peak Performance Primer',
        price: 369.0,
        inStock: true,
        imageUrl: 'https://m.media-amazon.com/images/I/41+eK8zBw+L._SY445_SX342_.jpg',
    };
    const item2 = {
        title:
            'Safari Ray Voyage 53 Cms Small Cabin Polycarbonate (Pc) Hard Sided 4 Wheels 360 Degree Rotation Printed Luggage',
        price: 2104.0,
        inStock: true,
        imageUrl: 'https://m.media-amazon.com/images/I/71w1B-6OBHL._SY879_.jpg',
    };

    const total = items.price + item2.price;

    return (
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
                <div style={pageStyles.rightColumn}>
                    <div style={summaryStyles.box}>
                        <h2 style={summaryStyles.title}>Order Summary</h2>
                        <div style={summaryStyles.line}>
                            <p>Items (2):</p>
                            <p>₹{total.toFixed(2)}</p>
                        </div>
                        {/* You could add more lines here for shipping, taxes, etc. */}
                        <div style={summaryStyles.totalLine}>
                            <p>Order Total:</p>
                            <p>₹{total.toFixed(2)}</p>
                        </div>
                        <button style={summaryStyles.button}>Proceed to Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CartItemComponent({ imageUrl, title, price }) {

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
                            <button style={itemStyles.quantityButton}>-</button>
                            <span style={itemStyles.quantityDisplay}>1</span>
                            <button style={itemStyles.quantityButton}>+</button>
                        </div>
                        <span style={itemStyles.deleteLink}>Delete</span>
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