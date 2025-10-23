import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { cartItem } from "../store/cartItemState";

// Styles are grouped together for better organization and readability
const styles = {
    navBar: {
        backgroundColor: '#131A22', // A color closer to the Amazon navbar
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        paddingTop: '21px',
        paddingBottom: "18px",
        width: "100vw"
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
        paddingRight: "80vh",
        paddingLeft: "20vh",
        color: "white",
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px', // Spacing between "Hello, User" and the cart
        paddingRight: "20vh"
    },
    userGreeting: {
        fontSize: '14px',
        margin: 0,
    },
    cartContainer: {
        position: 'relative', // Needed to position the cart count absolutely
        display: 'flex',
        alignItems: 'center',
    },
    cartIcon: {
        width: '38px',
        height: '38px',
    },
    cartCount: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: '#f08804',
        color: '#131A22',
        borderRadius: '50%',
        width: '22px',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
    },
};

// Main component for the navigation bar

// Reusable NavBar component
export function NavBarComponent() {
    const cartItems = useRecoilValue(cartItem)

    return (
        <div style={styles.navBar}>
            {/* Left side: Logo */}

            <Link to="/">
                <h1 style={styles.logo}>amazon.in</h1>
            </Link>
            {/* Right side: User Greeting and Cart */}
            <div style={styles.rightSection}>
                <h2 style={styles.userGreeting}>Hello, User</h2>
                <div style={styles.cartContainer}>
                    {/* Embedded SVG for the cart icon */}
                    <Link to="/cart">
                        <img width={"35px"} src="https://www.citypng.com/public/uploads/preview/hd-shopping-cart-white-logo-icon-transparent-png-701751694973936amdcratijm.png" alt="cart" />
                    </Link>
                    <div style={styles.cartCount}>{cartItems.length}</div>
                </div>
            </div>
        </div>
    );
}
