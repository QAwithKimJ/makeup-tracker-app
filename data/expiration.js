// expiration.js - Handles expiration tracking logic separately from app.js logic so it can be tested in isolation

export function getExpirationStatus(product) {
const expirationTimes = {
    foundation: 12, // months
    mascara: 6,
    lipstick: 18,
    eyeshadow: 24,
    blush: 24,
    concealer: 12,
    primer: 12,
    "setting-spray": 12,
};


    const purchaseDate = new Date(product.purchaseDate);
    const monthsToAdd = expirationTimes[product.category] || 12; // Default to 12 months if missing
    const expirationDate = new Date(purchaseDate);
    expirationDate.setMonth(expirationDate.getMonth() + monthsToAdd);
    
    const today = new Date();
    const timeDiff = expirationDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    console.log(`Product: ${product.category}`);
    console.log(`Purchase Date: ${product.purchaseDate}`);
    console.log(`Expiration Date: ${expirationDate.toISOString().split('T')[0]}`);
    console.log(`Days Left Until Expiration: ${daysLeft}`);

    if (daysLeft < 0) {
        return { status: "Expired", color: "#ff4d4d" };
    } else if (daysLeft < 21) {
        return { status: "Replace Soon", color: "#ff9900" };
    } else if (daysLeft < 90) {
        return { status: "Expiring Soon", color: "#ffd700" };
    } else {
        return { status: "Safe", color: "#4caf50" };
    }
}

