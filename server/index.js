const express = require("express"); // import express from "express" e karşılık geliyor.
const fs = require("fs");   // node.js kurulduğunda dahili olarak gelir, (file system)
const cors = require("cors"); // express 4000 de çalışırken react tarafı 3000 de çalışıyor, ikisi arasındaki senkronizasyon için "cors"
/**
 *
 * @param {string} text
 * @returns string
 */
const convertToEn = (text) => {  // Türkçe karakterleri İngilizce karakterlerine dönüştürür
	return text        // büyük-küçük harf karakterlerini küçültür.
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
		.toLocaleLowerCase();
};
const readJson = async (path = "./db/products.json") => {
	return new Promise((resolve, reject) => {  // Promise, dosyayı okuma işleminin başarılı olup olmadığını belirten bir başarı veya reddetme geri dönüş değeri döndürür.
		fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
			if (!err) {
				return resolve(JSON.parse(data)); // JSON.parse() ayrıştırır ve veriyi çözülmüş haliyle döndürür
			}
			return reject(err); // hata mesajı
		});
	});
};

const PORT = 4000; // port tanımlama
const app = express(); // express sayesinde wen sunucusu oluşturulur. bunu da app değişkenine atadık.

app.use(cors()); // Cross-Origin Resource Sharing...sunucunun bir web tarayıcısından yapılan istekleri kabul etmesine izin verir. API'miz farklı bir URL'de olduğu için CORS ile sunucudan veri almamıza olanak sağlar. CORS olmadan çalışmayacaktır.

app.use(express.static("assets")); // API içerisinde belirttiğimiz assets klasörü içerisindeki imageleri sunucuya ekler. Ulaşmamıza olanak sağlar. Ayrıca adres satırından yolunu belirtip de ulaşabiliriz.

app.get("/", (req, res, next) => { //bir HTTP GET isteğine yanıt verir ve "res.send()" yöntemiyle bir cevap gönderir.
	res.send("react bootcamp restaurant menu system apiii");  // get request isteğini cevaplamak içindir.
});

const sortingFunctions = {
	"price-asc": (a, b) => (parseFloat(a.price) < parseFloat(b.price) ? -1 : 1),   // artan fiyat
	"price-desc": (a, b) => (parseFloat(a.price) < parseFloat(b.price) ? 1 : -1),	// azalan fiyat
	"name-asc": (a, b) => (convertToEn(a.name) < convertToEn(b.name) ? -1 : 1),     //  a'dan z'ye
	"name-desc": (a, b) => (convertToEn(a.name) < convertToEn(b.name) ? 1 : -1),	// z'den a'ya
};

const duration = 1500; // 57'de tanımladığımız delay için sayfadaki image'lerin kaç saniyede yükleneceğini belirlemek için

const delay = (cb) => {
	setTimeout(cb, duration); // "setTimeout()" metodunu kullanarak bir zaman aşımı oluşturur ve bu sayede belirtilen bir zaman diliminden sonra bir işlemi gerçekleştirir.
};

app.get("/api/products", async (req, res, next) => {    //GET isteği yaparsa, sunucu bu isteğe yanıt olarak bir ürün listesi döndürür
	const keyword = convertToEn(req.query.keyword || "");
	const categoryId = req.query.categoryId || "";
	const productId = req.query.id || "";
	// gelebilecek olan sorting parametreleri
	// price-asc | price-desc | name-asc | name-desc | ""
	const sorting = convertToEn(req.query.sorting || "");

	let products = await readJson();

	if (productId) {
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

app.get("/api/dailymenu", async (req, res, next) => {
	let products = await readJson();

	const dailyMenu = await readJson("./db/daily.json");

	const items = dailyMenu.items.map((item) => {
		const product = products.find((product) => product.id == item.id);
		return product;
	});

	delay(() => {
		res.send(items);
	});
});

app.get("/api/cart", async (req, res) => {
	// price-asc | price-desc | name-asc | name-desc | ""
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
		.filter((item) => items.find((x) => x.id === item.id.toString()))
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

app.listen(PORT, () => {
	console.log(`api şuanda ${PORT} portunda çalışıyor...`);
});
