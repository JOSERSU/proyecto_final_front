export interface Review {
    id?: number,
    product_id: Number,
    review_text: string,
    rating: Number,
    review_date: string,
    user: string
}

export type Reviews = Review[];