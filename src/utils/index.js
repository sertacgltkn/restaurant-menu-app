/**
 *
 * @param {number} price
 * @returns
 */

export function formatPrice(price) {
  return `${price.toFixed(2)}  ₺`;
}
/* 
    toFixed(2) js methodu : fiyatın .'dan sonraki küsüratını 2 haneli yapar. 
              
                 formatPrice bizim yazdığımız bir method ve utils klasörü içinde  
             
               TL işareti için alt gr+ T = ₺  */

export const appToast = {
  // toast mesajı göstermek için
  showToast(value = false) {
    // value parametresi true/false değeriyle toast mesajının gösterilip gösterilmeyeceğini belirtir.
    document.dispatchEvent(new CustomEvent("FETCHING", { detail: value })); // Fonksiyon içinde, bir "CustomEvent" oluşturulur ve bu olay "FETCHING" adıyla tanımlanır. Bu olay, "value" parametresinin değerini "detail" özelliğine atar ve bu olayın bir örneği "document" nesnesine gönderilir. Bu sayede, sayfa içinde bu olaya bir dinleyici tanımlanarak, "value" değerine göre toast mesajı gösterilebilir veya gizlenebilir.
  },
};
