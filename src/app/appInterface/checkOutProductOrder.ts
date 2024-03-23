export interface CheckOutProductOrder {
    order_product_inventory?: any[];
    order_quantity?: any;
    order_id?: any;
    order_price_details?: priceDetails;
    order_copun_details?:copunDetails;
    order_offer_details?: any;
    order_shipping_address?: any;
    order_biling_address?: any;
    order_place_by?: any;
    order_currency?: any;
    order_mode_of_payment?: any;
}


export interface copunDetails {
    copun_discount_price?: number|0,
    copun_code?: string

}

export interface priceDetails {
    total_mrp_price?: number|0;
    total_price?: number|0;
    total_copun_discount?:number|0
    final_price?: number|0;
}
