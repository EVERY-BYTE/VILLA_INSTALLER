"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVillasWithBookings = void 0;
const bookingModel_1 = require("../../models/bookingModel");
const villaModel_1 = require("../../models/villaModel");
const getAllVillasWithBookings = async (req, res) => {
    try {
        // Fetch all villas
        const villas = await villaModel_1.VillaModel.findAll({
            attributes: ['villaId', 'villaName']
        });
        // Fetch all bookings
        const bookings = await bookingModel_1.BookingModel.findAll({
            attributes: ['bookingId', 'bookingVillaId', 'bookingStartDate', 'bookingEndDate']
        });
        // Transform data: Group bookings by villaId
        const bookingsByVillaId = {};
        bookings.forEach((booking) => {
            const villaId = booking.bookingVillaId;
            if (!bookingsByVillaId[villaId]) {
                bookingsByVillaId[villaId] = [];
            }
            bookingsByVillaId[villaId].push({
                bookingId: booking.bookingId,
                bookingStartDate: booking.bookingStartDate,
                bookingEndDate: booking.bookingEndDate
            });
        });
        // Map villas with their bookings
        const formattedData = villas.map((villa) => ({
            villaId: villa.villaId,
            villaName: villa.villaName,
            bookings: bookingsByVillaId[villa.villaId] || [] // Attach bookings or an empty array
        }));
        res.status(200).json(formattedData);
    }
    catch (error) {
        console.error('Error fetching villas with bookings:', error);
        res.status(500).json({ message: 'Failed to fetch villa data' });
    }
};
exports.getAllVillasWithBookings = getAllVillasWithBookings;
