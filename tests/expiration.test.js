import { getExpirationStatus } from "../data/expiration.js";

describe("Expiration Status Tests", () => {
    test("Product marked as Expired when past expiration date", () => {
        const product = { category: "mascara", purchaseDate: "2023-01-01"};  // more than 6 months ago and mascara expires at 6 months
        expect(getExpirationStatus(product)).toEqual({ status: "Expired", color: "#ff4d4d"});
    });

    test("Product marked as Replace Soon when less than 3 weeks left", () => {
        const today = new Date();
        const purchaseDate = new Date(today);
        purchaseDate.setMonth(today.getMonth() - 6); // sets the month of the purchase date to 6 months ago
        purchaseDate.setDate(today.getDate() - 170); // adjusts the day of the purchase date to be 170 days earlier than today, which is 20 days away from expiration

        const product = { category: "foundation", purchaseDate: purchaseDate.toISOString().split('T')[0] };
        expect(getExpirationStatus(product)).toEqual({ status: "Replace Soon", color: "#ff9900" });
    });
})