// import express from "express"

const express = require("express"); // kolayca web uygulamaları oluşturmak için kullanılan bir JavaScript kütüphanesidir.
const fs = require("fs");  // Node.js içinde dosya sistemi işlemleri yapmak için kullanılan bir kütüphanedir.
const cors = require("cors"); // Cross-Origin Resource Sharing (CORS) bir web tarayıcısı tarafından uygulanan bir güvenlik politikasıdır. CORS, bir web sayfasının, bir sunucudan farklı bir kaynaktan yüklenen bir kaynağa erişmesine izin verip vermemesini kontrol eder.
/**
 *
 * @param {string} text 
 * @returns string
 */
const convertToEn = (text) => {  // Türkçe karakterleri ingilizce karakterlere çevirir.
  return text 
    .replace("Ğ", "g")
    .replace("Ü", "u")
    .replace("Ş", "s")
    .replace("I", "i")
    .replace("İ", "i")
    .replace("Ö", "o")
    .replace("Ç", "c")
    .replace("ğ", "g")
    .replace("ü", "u")
    .replace("ş", "s")
    .replace("ı", "i")
    .replace("ö", "o")
    .replace("ç", "c")
    .toLocaleLowerCase();  // küçük harfe çevrilir ve son olarak fonksiyon tarafından döndürülür.
};
const readJson = async (path = "./db/products.json") => {   //Bu fonksiyon, dosya sisteminde bir JSON dosyasını okur ve içeriğini bir JavaScript nesnesine dönüştürür. Fonksiyon, dosya yolunu bir parametre olarak alır ve varsayılan olarak ./db/products.json dosyasını okur.
  return new Promise((resolve, reject) => {   //Promise, bir işlemin gelecekte tamamlanacağını veya bir hata oluşacağını ifade eden bir nesnedir. Promise nesnesi, bir işlemin başarılı bir şekilde tamamlanması durumunda resolve metodu ile, bir hata oluşması durumunda ise reject metodu ile çağrılır. 
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => { //  fs.readFile metodunu kullanarak bir dosya okunur. Eğer dosya okuma işlemi başarılı bir şekilde tamamlanırsa, dosya içeriği JSON.parse metodu ile bir JavaScript nesnesine dönüştürülür 
      if (!err) {
        return resolve(JSON.parse(data)); //  resolve metodu ile Promise nesnesine geri döndürülür. 
      }
      return reject(err); // Eğer dosya okuma işlemi sırasında bir hata oluşursa, reject metodu ile bu hatayı geri döndürür.
    });
  });
};

const PORT = 4000; // port number
const app = express(); // bir web sunucusu oluşturur. app değişkeni, oluşturulan web sunucusunu temsil eder ve bu değişken, daha sonra sunucuya özelleştirilmiş ayarlar eklemek, route'lar (URL'ler) tanımlamak ve diğer işlemler için kullanılacaktır.

app.use(cors()); //  cors modülünü web sunucusuna uygulayarak, farklı kaynaklardan gelen isteklere izin vermeyi sağlar.

app.use(express.static("assets")); //  assets dizini statik olarak sunulacaktır ve bu dizin, web sunucusunun kök dizininde bulunur. Bu sayede, assets dizininde bulunan dosyalar, istemci tarafından direkt olarak erişilebilir hale gelir.

app.get("/", (req, res, next) => { //  req nesnesi, istemcinin gönderdiği istek bilgilerini içerir ve res nesnesi ise sunucunun istemciye göndereceği cevap bilgilerini içerir. 
  res.send("restaurant menu system api"); // next fonksiyonu ise, bir sonraki middleware fonksiyonunu çağırmak için kullanılır.
}); // Bu route'un işleme fonksiyonu, istemci tarafından gönderilen bir isteğe karşılık olarak "restaurant menu system api" dizesini istemciye gönderir. Bu sayede, istemci tarafından / URL'sine bir GET isteği yapıldığında, istemciye "restaurant menu system api" dizesi gönderilir.

const sortingFunctions = {  // parseFloat metodu, bir string ifadenin başındaki ve sonundaki boşlukları siler ve ardından string ifadenin başındaki sayısal değeri alır. Eğer string ifade başında sayısal bir değer yoksa NaN değeri döndürür.
  "price-asc": (a, b) => (parseFloat(a.price) < parseFloat(b.price) ? -1 : 1),  // artan fiyata göre sıralama
  "price-desc": (a, b) => (parseFloat(a.price) < parseFloat(b.price) ? 1 : -1),  //  azalan fiyata göre sıralama
  "name-asc": (a, b) => (convertToEn(a.name) < convertToEn(b.name) ? -1 : 1), // a'dan z'ye göre sıralama
  "name-desc": (a, b) => (convertToEn(a.name) < convertToEn(b.name) ? 1 : -1), // z'den a'ya göre sıralama
};

const duration = 900;

const delay = (cb) => { // cb => callBack 
  setTimeout(cb, duration); // Bu işlev, verilen bir işlevi (veya kod bloğunu) belirli bir zaman dilimi sonra çalıştırmak için kullanılır. 
};

app.get("/api/products", async (req, res, next) => {  // API çağrılır.
  const keyword = convertToEn(req.query.keyword || ""); // keyword değişkeni "req.query.keyword" nesnesinden okunan anahtar kelimeye atanır. varsayılan olarak boş bir dize olarak ayarlanır.
  const categoryId = req.query.categoryId || ""; // "categoryId" değişkeni "req.query.categoryId" nesnesinden okunan kategori kimliğine atanır ve varsayılan olarak boş bir dize olarak ayarlanır.
  const productId = req.query.id || ""; // "id" değişkeni "req.query.id" nesnesinden okunan kategori kimliğine atanır ve varsayılan olarak boş bir dize olarak ayarlanır.
  const sorting = convertToEn(req.query.sorting || ""); // "convertToEn" fonksiyonu, istekte bulunan anahtar kelime ve sıralama bilgilerini İngilizce karakterlere çevirir. Bu API, istekte bulunan bilgilere göre ürünleri sorgulayarak sonuçları döndürür.

  let products = await readJson(); // bir JSON dosyasından ürün verilerini okur ve bu verileri "products" değişkenine atar. "await" anahtar kelimesi, dosyadan verileri okuma işleminin tamamlanmasını beklemek için kullanılır. Bu sayede, dosyadan verileri okuma işlemi bittikten sonra kod bloğundaki işlemler devam edebilir.

  if (productId) {  // Eğer ürün kimliği belirtilmemişse, bu kod bloğu hiçbir işlem yapmaz ve kod bloğunun işlemesine devam edilir. Öncelikle, "productId" değişkeni kontrol edilir. Eğer bu değişken değeri boş değilse, "delay" fonksiyonu çağrılır ve bir zaman aşımına ayarlanır. Zaman aşımı süresi sonunda, "res.send" metodu çağrılarak istek yapılan sayfaya ürün verisi gönderilir. Veri, "products" değişkeninde bulunan ürünler arasında "find" metodu kullanılarak aranır ve eşleşen ürün döndürülür. Eğer ürün bulunamazsa, boş bir değer döndürülür. Bu kod bloğu, istekte bulunan ürün kimliğine sahip bir ürün bulunduğunda kod bloğunun işlemesini sonlandırır.
    delay(() => {
      res.send(products.find((product) => product.id.toString() === productId));
    });
    return;
  }

  if (categoryId != "") {
    products = products.filter(
      (product) => product.category_id.toString() === categoryId
    );
  }

  // ürün adı ve kategorisine göre arama yapmak için searchKeyword adında bir propert ekledik
  products = products.map((product) => {
    product.searchKeyword = product.category + " " + product.name;
    return product;
  });
  // eğer keyword varsa filtreledik
  if (keyword) {
    products = products.filter((x) =>
      convertToEn(x.searchKeyword).includes(keyword)
    );
  }

  // basit kullanım
  // if (sorting === "price-asc") {
  //   // fiyata göre küçükten büyüğe sırala
  //   products = products.sort((a, b) => parseFloat(a.price) < parseFloat(b.price) ? -1 : 1)
  // }
  // if (sorting === "price-desc") {
  //   // fiyata göre büyükten küçüğe sırala
  //   products = products.sort((a, b) => parseFloat(a.price) < parseFloat(b.price) ? 1 : -1)
  // }
  // if (sorting === "name-asc") {
  //   // ürün adına göre a'den z ya sırala
  //   products = products.sort((a, b) => convertToEn(a.name) < convertToEn(b.name) ? -1 : 1)
  // }
  // if (sorting === "name-desc") {
  //   // ürün adına göre z'den a ya sırala
  //   products = products.sort((a, b) => convertToEn(a.name) < convertToEn(b.name) ? 1 : -1)
  // }

  // temiz kullanım
  const sortingFn = sortingFunctions[sorting];
  if (sortingFn) {
    products = products.sort(sortingFn);
  }

  delay(() => {
    res.send(products);
  });
});

app.get("/api/dailymenu", async (req, res, next) => { // günlük menü verilerini döndürür.
  let products = await readJson(); //  bir JSON dosyasından ürün verilerini okur ve bu verileri "products" değişkenine atar.

  const dailyMenu = await readJson("./db/daily.json"); // bir başka JSON dosyasından günlük menü verilerini okur ve bu verileri "dailyMenu" değişkenine atar. 

  const items = dailyMenu.items.map((item) => { // "dailyMenu" değişkeninde bulunan ürün kimliklerine göre "products" değişkeninde bulunan ürünler arasında arama yapar ve bulduğu ürünleri "items" değişkenine atar.
    const product = products.find((product) => product.id == item.id);
    return product;
  });

  delay(() => {
    res.send(items);
  });
});

app.get("/api/cart", async (req, res) => { // "sepet" işlevselliğini gerçekleştirmek için
  const sorting = convertToEn(req.query.sorting || "");

  const items = (req.query.ids || "").split(",").map((item) => {
    const [id, quantity] = item.split("-");
    return {
      id,
      quantity,
    };
  });

  let products = await readJson();  
  products = products
    .filter((item) => items.find((x) => x.id === item.id.toString()))  // sadece kullanıcının sepetinde bulunan ürünleri filtreler ve her ürün için bir "miktar" ve "toplam fiyat" özelliği ekler. 
    .map((product) => {
      const item = items.find((x) => x.id === product.id.toString());
      const qty = parseInt(item?.quantity || "1");
      product.quantity = qty;
      product.totalPrice = product.price * qty;
      return product;
    });
  const sortingFn = sortingFunctions[sorting];
  if (sortingFn) {
    products = products.sort(sortingFn);
  }
  delay(() => {
    res.send(products);
  });
});

app.listen(PORT, () => {   // belirtilen bağlantı noktasında bir sunucu başlatır ve web isteklerini bu bağlantı noktasından dinler. Kullanıcılar bu bağlantı noktasına bir web tarayıcısıyla bağlanarak uygulamanın işlevselliğine erişebilirler. Bu kod parçacığı ayrıca, bağlantı noktası ve dinleme başlatıldığını gösteren bir ileti yazdırır.
  console.log(`api şuanda ${PORT} portunda çalışıyor...`);
});
