import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartCounter } from "../store/cartItemState";

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
            paddingBottom: "18px"
        },
        logo: {
            fontSize: '24px',
            fontWeight: 'bold',
            margin: 0,
            paddingRight: "80vh",
            paddingLeft: "20vh"
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
    const cartCount = useRecoilValue(cartCounter)

    return (
        <div style={styles.navBar}>
            {/* Left side: Logo */}
            <h1 style={styles.logo}>amazon.in</h1>

            {/* Right side: User Greeting and Cart */}
            <div style={styles.rightSection}>
                <h2 style={styles.userGreeting}>Hello, User</h2>
                <div style={styles.cartContainer}>
                    {/* Embedded SVG for the cart icon */}
                    <svg
                        style={styles.cartIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7.0272C7.3044 18.0176 8.5248 19 9.9488 19H10C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 17.5523 8.44772 18 9 18C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16C8.71458 16 8.45262 16.1121 8.2618 16.2929L8.188 16.219L7.9232 15H18.0768L21 4H6.20834L5.79166 2ZM18.9232 6L17.0768 13H8.9232L7.0768 6H18.9232Z"
                            fill="white"
                        />
                        <path d="M16 20C16 20.5523 15.5523 21 15 21C14.4477 21 14 20.5523 14 20C14 19.4477 14.4477 19 15 19C15.5523 19 16 19.4477 16 20Z" fill="white" />
                        <path d="M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20Z" fill="white" />
                    </svg>
                    <div style={styles.cartCount}>{cartCount}</div>
                </div>
            </div>
        </div>
    );
}




// import { Link } from "react-router-dom"

// const NavBarStyle = {
//     background: "#1c2842ff",
//     display: "flex",
//     padding: "18px",
// }

// const cartCountStyle = {
//     background: "#f76504ff",
//     width: "24px",
//     height: "24px",
//     borderRadius: "15px",
// }

// export function NavBar() {
//     return (
//         <>
//             <div style={NavBarStyle}>

//                 <h1>amazon.in</h1>

//                 <h2>Hello, User</h2>
//                 <img width={"45px"} src="src/assets/cart.svg" alt="cart" />
//                 <p style={cartCountStyle}>1</p>
//             </div>
//         </>
//     )
// }