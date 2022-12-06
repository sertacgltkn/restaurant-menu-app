/**
 * 
 * @param {number} price 
 * @returns 
 */

export function formatPrice(price) {
    return `${price.toFixed(2)}  ₺`
}
/* 
    toFixed(2) js methodu : fiyatın .'dan sonraki küsüratını 2 haneli yapar. 
              
                 formatPrice bizim yazdığımız bir method ve utils klasörü içinde  
             
               TL işareti için alt gr+ T = ₺  */