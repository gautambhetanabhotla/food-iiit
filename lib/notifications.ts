import { supabase } from "@/lib/supabaseClient"

// Types for notifications
export type NotificationType =
    | 'bid_placed'
    | 'bid_accepted'
    | 'payment_marked'
    | 'bid_updated'

interface NotificationData {
    listingId?: string
    bidId?: string
    sellerId?: string
    buyerId?: string
    price?: number
    mess?: string
    meal?: string
}

/**
 * Send a notification to a user
 */
export async function sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data: NotificationData = {}
) {
    try {
        const { error } = await supabase
            .from('notifications')
            .insert({
                user_id: userId,
                type,
                title,
                message,
                data,
            })

        if (error) throw error
        return true
    } catch (error) {
        console.error('Error sending notification:', error)
        return false
    }
}

/**
 * Helper to create notification messages for different scenarios
 */
export const notificationMessages = {
    // For a seller when a new bid is placed
    bidPlaced: (price: number, mess: string, meal: string) => ({
        title: 'New Bid Received',
        message: `Someone placed a bid of ₹${price} on your ${mess} ${meal} listing.`,
    }),

    // For a buyer when their bid is accepted
    bidAccepted: (price: number, mess: string, meal: string) => ({
        title: 'Bid Accepted!',
        message: `Your bid of ₹${price} for ${mess} ${meal} has been accepted. Please contact the seller to complete the transaction.`,
    }),

    // For a buyer when their bid is marked as paid
    paymentMarked: (price: number, mess: string, meal: string) => ({
        title: 'Payment Confirmed',
        message: `Your payment of ₹${price} for ${mess} ${meal} has been confirmed by the seller.`,
    }),

    // For a seller when a buyer has paid
    paymentReceived: (price: number, mess: string, meal: string) => ({
        title: 'Payment Received',
        message: `You've confirmed receiving payment of ₹${price} for your ${mess} ${meal} listing.`,
    }),

    // For seller when bid is updated
    bidUpdated: (price: number, mess: string, meal: string) => ({
        title: 'Bid Updated',
        message: `A bid on your ${mess} ${meal} listing has been updated to ₹${price}.`,
    }),
}
