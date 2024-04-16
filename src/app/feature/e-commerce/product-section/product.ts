export interface Product {
    product_Id ?:string;
    product_Name?:string;
    product_Description?:string;
    product_Mrp_Price?:string;
    product_Selling_Price?:number;
    product_Discoute_Percentage?:number;
    product_Category?:string;
    product_SubCategory?:string;
    product_stock_count?:any;
    product_Images?:any;
    product_Expires?:any;
    product_AVG_Rating?:number;
    product_Total_Rating?:number;
    product_Seller_ID?:string;
    product_Has_Own_Delivery?:string;
    product_delevery_pincodes?:string
    product_delevery_charges?:string[]
    
}

// {
//     "product_Id": "fe01ce2a7fbac8fafaed7c982a04e2292111678601329",
//     "product_Name": "TEST PRODUCT",
//     "product_Description": "TEXT PRODUCT",
//     "product_Mrp_Price": 50,
//     "product_Selling_Price": 45,
//     "product_Discoute_Percentage": 10,
//     "product_Category": "Vegetable",
//     "product_stock_count": 12,
//     "product_Seller_ID": "W-FARMS_123",
//     "product_Images": "01678601275.jpg,11678601275.jpg",
//     "product_Expires": "2023-3-8",
//     "product_Created_Date": "March 12th 2023, 11:38:49 am",
//     "product_Live_Status": "active",
//     "product_AVG_Rating": 0,
//     "product_Total_Rating": 0
// }