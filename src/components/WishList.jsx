import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { wishItem } from "../store/wishItemState";
import { cartItem } from "../store/cartItemState";
import { useEffect, useState } from "react";
import { AddProductModal } from "./AddProductModal";
import { searchItem } from "../store/searchItemState";
import { useDebounce } from "./useDebounce";

// Styles for the main page layout
const pageStyles = {
    container: {
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        color: '#0F1111',
        backgroundColor: '#EAEDED', // Light grey background like Amazon
        minHeight: '100vh',
    },
    sidebar: {
        width: '15vw',
        minWidth: '200px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRight: '1Spx solid #DDD',
    },
    mainContent: {
        width: '85vw',
        padding: '20px 30px',
    },
};

// Styles for the sidebar
const sidebarStyles = {
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 10px 0',
    },
    link: {
        fontSize: '14px',
        color: '#007185', // Amazon blue link color
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

// Styles for the main content header
const headerStyles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #DDD',
        paddingBottom: '10px',
    },
    left: {
        display: 'flex',
        alignItems: 'baseline', // Aligns title and "Public" text
        gap: '10px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        margin: 0,
    },
    subtext: {
        fontSize: '14px',
        color: '#565959',
        margin: 0,
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    shareLink: {
        fontSize: '14px',
        color: '#007185',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    icon: {
        width: '24px', // Standardized icon size
        height: '24px',
        cursor: 'pointer',
    },
};

// Styles for the toolbar (search, filter, etc.)
const toolbarStyles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 0',
        margin: '10px 0',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    iconButton: {
        padding: '5px',
        border: '1px solid transparent',
        borderRadius: '3px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
    },
    activeIcon: {
        // Style for the "selected" grid icon
        border: '1px solid #007185',
        backgroundColor: '#F0F2F2',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    searchInput: {
        width: '250px',
        padding: '8px 10px',
        fontSize: '14px',
        border: '1px solid #DDD',
        borderRadius: '4px',
    },
    filterButton: {
        padding: '8px 12px',
        fontSize: '14px',
        backgroundColor: '#F0F2F2',
        border: '1px solid #DDD',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

// Styles for the grid of items
const gridStyles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // Creates a 4-column grid
        gap: '20px', // Space between items
    },
};

// Styles for a single shopping item card
const itemStyles = {
    card: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #DDD',
        borderRadius: '4px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column', // Stacks items vertically
        height: '100%', // Ensures all cards are the same height
        boxSizing: 'border-box', // Includes padding/border in height/width
    },
    imageContainer: {
        width: '100%',
        height: '180px', // Fixed height for image area
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain', // Ensures image fits without stretching
    },
    title: {
        fontSize: '14px',
        color: '#0F1111',
        fontWeight: 'normal',
        margin: '0 0 10px 0',
        minHeight: '4.2em', // Reserves space for ~3 lines of text
    },
    price: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#0F1111',
        margin: '0 0 10px 0',
    },
    button: {
        backgroundColor: '#FFD814', // Amazon yellow
        color: '#0F1111',
        border: '1px solid #FCD200',
        borderRadius: '8px',
        padding: '8px 12px',
        width: '100%',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: 'auto', // *** This pushes the button to the bottom ***
    },
    buttonAdded: {
        backgroundColor: '#17d6cdff', // Amazon yellow
        color: '#0F1111',
        border: '1px solid #09a4b3ff',
        borderRadius: '8px',
        padding: '8px 12px',
        width: '100%',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: 'auto', // *** This pushes the button to the bottom ***
    },
};

// --- COMPONENTS ---

export function WishListComponent() {
    const setWishItems = useSetRecoilState(wishItem);

    const [searchItems, setSearchItems] = useRecoilState(searchItem)

    // State to control the modal's visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // This function will be passed to the modal
    const handleAddProduct = (newProduct) => {
        setWishItems((oldWishList) => [
            ...oldWishList,
            {
                imageUrl: newProduct.imageUrl,
                title: newProduct.title,
                price: newProduct.price,
            },
        ]);
    };

    return (
        <div style={pageStyles.container}>
            {/* Sidebar (Left Column) */}
            <div style={pageStyles.sidebar}>
                {/* sidebar content  */}
                <div style={{ background: "#F7F7F7", padding: "8px", border: "1px solid #DDD", borderRadius: "4px" }}>
                    <h1 style={sidebarStyles.title}>Your Wish List</h1>
                    <a href="#" style={sidebarStyles.link}>
                        Default List
                    </a>
                </div>
            </div>

            {/* Main Content (Right Column) */}
            <div style={pageStyles.mainContent}>
                {/* Main Header */}
                <div style={headerStyles.container}>
                    <div style={headerStyles.left}>
                        <h1 style={headerStyles.title}>Your Wish List</h1>
                        <p style={headerStyles.subtext}>Public</p>
                    </div>
                    <div style={headerStyles.right}>
                        <a href="#" style={headerStyles.shareLink}>
                            <img width={"24px"} src="https://cdn-icons-png.flaticon.com/512/9069/9069013.png" alt="share" />
                            <span>Send list to others</span>
                        </a>
                        <img style={{ cursor: "pointer" }} width={"28px"} src="https://static.thenounproject.com/png/683450-200.png" alt="more" />
                    </div>
                </div>

                {/* Toolbar */}
                <div style={toolbarStyles.container}>
                    <div style={toolbarStyles.left}>
                        <img style={{ cursor: "pointer" }} width={"35px"} src="https://cdn3.iconfinder.com/data/icons/faticons/32/grid-2-01-512.png" alt="grid" />
                        {/* Updated onClick to open the modal */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            style={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                        >
                            <img
                                style={{ cursor: 'pointer' }}
                                width={'45px'}
                                src="https://cdn0.iconfinder.com/data/icons/circles-2/100/sign-square-plus-512.png"
                                alt="add"
                            />
                            <p style={{ fontSize: '14px', margin: '0 0 0 5px' }}>
                                Add Products
                            </p>
                        </div>
                    </div>
                    <div style={toolbarStyles.right}>
                        <input
                            type="text"
                            placeholder="Search items"
                            value={searchItems}
                            onChange={(e) => setSearchItems(e.target.value)}
                            style={toolbarStyles.searchInput}
                        />
                        <button style={toolbarStyles.filterButton}>Filter & Sort</button>
                    </div>
                </div>

                {/* Item Grid */}
                <div style={gridStyles.container}>
                    <WishItemElements />
                </div>
            </div>

            {/* Render the modal here */}
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
}

// Your ShoppingItemComponent, now with styles
function WishItemComponent({ imageUrl, title, price }) {
    const [itemAdded, setItemAdded] = useState(false)
    const setCartItems = useSetRecoilState(cartItem)

    function increaseCartCount() {
        setItemAdded(true)
        setCartItems(item => [...item, {
            imageUrl: imageUrl,
            title: title,
            price: price
        }])
        console.log(title)
    }
    function takeSomewhere() {
        console.log("Item Added")
    }

    return (
        <div style={itemStyles.card}>
            <div style={itemStyles.imageContainer}>
                <img src={imageUrl} alt={title} style={itemStyles.image} />
            </div>
            <p style={itemStyles.title}>{title}</p>
            {/* Using the Rupee symbol from the image */}
            <p style={itemStyles.price}>${price.toFixed(2)}</p>
            <button onClick={itemAdded ? takeSomewhere : increaseCartCount} style={itemAdded ? itemStyles.buttonAdded : itemStyles.button}>{itemAdded ? "Added to the cart" : "Add to Cart"}</button>
        </div>
    );
}

function WishItemElements() {
    const wishItems = useRecoilValue(wishItem)
    
    const [searchItems, setSearchItems] = useRecoilState(searchItem)
    const searchItemdebouncedVal = useDebounce(searchItems, 200)

    //filtered items in wishlist
    const filteredItem = wishItems.filter((item) =>
        item.title.toLowerCase().includes(searchItemdebouncedVal.toLowerCase())
    );

    const WishItemSingleElement = filteredItem.map((item) => <WishItemComponent
        imageUrl={item.imageUrl}
        title={item.title}
        price={item.price}
    />)

    return (
        <>
            {WishItemSingleElement}
        </>
    )
}