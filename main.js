/**
 * BTAP ST4 - Constructor Function & Array Methods
 * Tất cả tên biến và hàm được viết chuẩn theo camelCase
 */

// CÂU 1: Khai báo constructor function Product
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;

  // Method để tính giá trị tồn kho
  this.getStockValue = function () {
    return this.price * this.quantity;
  };

  // Method để kiểm tra còn hàng
  this.isInStock = function () {
    return this.quantity > 0;
  };
}

// CÂU 2: Khởi tạo mảng products (6+ sản phẩm, 2+ danh mục)
const products = [
  new Product("P001", "iPhone 15 Pro Max", 34990000, 15, "Smartphone", true),
  new Product("P002", "Samsung Galaxy S24 Ultra", 32990000, 8, "Smartphone", true),
  new Product("P003", "MacBook Pro 16\"", 59990000, 5, "Laptop", true),
  new Product("P004", "Dell XPS 15", 42990000, 0, "Laptop", true),
  new Product("P005", "AirPods Pro 2", 6990000, 25, "Accessories", true),
  new Product("P006", "Samsung Galaxy Watch 6", 8990000, 0, "Accessories", false),
  new Product("P007", "iPad Pro 12.9\"", 28990000, 12, "Tablet", true),
  new Product("P008", "Sony WH-1000XM5", 7990000, 18, "Accessories", true)
];

console.log("CÂU 1 & 2: Constructor Function và Khởi tạo mảng products");
console.log(`Tổng số sản phẩm: ${products.length}`);
console.log(`Danh mục: ${[...new Set(products.map(p => p.category))].join(", ")}`);
console.log("");

// CÂU 3: Tạo mảng mới chỉ chứa name, price
const productBasicInfo = products.map(product => ({
  name: product.name,
  price: product.price
}));

console.log("CÂU 3: Mảng chứa name và price của mỗi sản phẩm");
console.table(productBasicInfo);
console.log("");

// CÂU 4: Lọc sản phẩm còn hàng (quantity > 0)
const availableProducts = products.filter(product => product.quantity > 0);

console.log("CÂU 4: Các sản phẩm còn hàng trong kho");
console.log(`Số sản phẩm còn hàng: ${availableProducts.length}`);
availableProducts.forEach(product => {
  console.log(`- ${product.name}: ${product.quantity} chiếc`);
});
console.log("");

// CÂU 5: Kiểm tra có sản phẩm giá > 30.000.000
const hasExpensiveProduct = products.some(product => product.price > 30000000);

console.log("CÂU 5: Kiểm tra sản phẩm giá > 30.000.000");
console.log(`Có ít nhất một sản phẩm giá trên 30.000.000: ${hasExpensiveProduct ? "CÓ" : "KHÔNG"}`);
if (hasExpensiveProduct) {
  const expensiveProducts = products.filter(p => p.price > 30000000);
  console.log("Các sản phẩm giá trên 30.000.000:");
  expensiveProducts.forEach(p => {
    console.log(`- ${p.name}: ${p.price.toLocaleString("vi-VN")} đ`);
  });
}
console.log("");

// CÂU 6: Kiểm tra tất cả Accessories có đang bán
const accessoriesProducts = products.filter(product => product.category === "Accessories");
const allAccessoriesAvailable = accessoriesProducts.length > 0 &&
  accessoriesProducts.every(product => product.isAvailable === true);

console.log("CÂU 6: Kiểm tra tất cả Accessories đang bán");
console.log(`Tổng số sản phẩm Accessories: ${accessoriesProducts.length}`);
accessoriesProducts.forEach(p => {
  console.log(`- ${p.name}: isAvailable = ${p.isAvailable}`);
});
console.log(`Tất cả Accessories đều đang bán: ${allAccessoriesAvailable ? "CÓ" : "KHÔNG"}`);
console.log("");

// CÂU 7: Tính tổng giá trị kho hàng
const totalStockValue = products.reduce((total, product) => {
  return total + product.getStockValue();
}, 0);

console.log("CÂU 7: Tổng giá trị kho hàng");
console.log("Giá trị từng sản phẩm:");
products.forEach(product => {
  const stockValue = product.getStockValue();
  console.log(`- ${product.name}: ${product.quantity} × ${product.price.toLocaleString("vi-VN")} = ${stockValue.toLocaleString("vi-VN")} đ`);
});
console.log(`\nTỔNG GIÁ TRỊ KHO HÀNG: ${totalStockValue.toLocaleString("vi-VN")} đ`);
console.log("");

// CÂU 8: Dùng for…of duyệt mảng products
console.log("CÂU 8: Duyệt mảng với for…of");
for (const product of products) {
  const status = product.isAvailable ? "Đang bán" : "Ngừng bán";
  console.log(`Tên: ${product.name} | Danh mục: ${product.category} | Trạng thái: ${status}`);
}
console.log("");

// CÂU 9: Dùng for…in duyệt thuộc tính đối tượng
console.log("CÂU 9: Duyệt thuộc tính với for…in");
console.log("--- Ví dụ với sản phẩm đầu tiên ---");
const firstProduct = products[0];
console.log(`Sản phẩm: ${firstProduct.name}`);
console.log("\nCác thuộc tính:");
for (const propertyName in firstProduct) {
  // Chỉ lấy own properties, không lấy inherited properties
  if (firstProduct.hasOwnProperty(propertyName)) {
    const value = firstProduct[propertyName];
    console.log(`- ${propertyName}: ${value}`);
  }
}
console.log("");

// CÂU 10: Lấy danh sách sản phẩm đang bán VÀ còn hàng
const sellingAndInStockProducts = products.filter(product =>
  product.isAvailable === true && product.quantity > 0
);

const sellingProductNames = sellingAndInStockProducts.map(product => product.name);

console.log("CÂU 10: Sản phẩm đang bán và còn hàng");
console.log(`Số lượng: ${sellingAndInStockProducts.length} sản phẩm`);
console.log("\nDanh sách:");
sellingAndInStockProducts.forEach(product => {
  console.log(`- ${product.name} (${product.category}) - Còn ${product.quantity} chiếc`);
});
console.log("");