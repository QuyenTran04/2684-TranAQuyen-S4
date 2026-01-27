
// BÀI TẬP JAVASCRIPT - QUẢN LÝ SẢN PHẨM



// CÂU 1: Khai báo constructor function Product

function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}


// CÂU 2: Khởi tạo mảng products với ít nhất 6 sản phẩm, tối thiểu 2 danh mục

const products = [
    new Product("P001", "iPhone 15 Pro Max", 34990000, 15, "Phone", true),
    new Product("P002", "Samsung Galaxy S24 Ultra", 32990000, 8, "Phone", true),
    new Product("P003", "MacBook Pro 14\"", 49990000, 5, "Laptop", true),
    new Product("P004", "Dell XPS 15", 45990000, 0, "Laptop", false),
    new Product("P005", "AirPods Pro 2", 6990000, 25, "Accessories", true),
    new Product("P006", "Apple Watch Series 9", 12990000, 12, "Accessories", true),
    new Product("P007", "Sony WH-1000XM5", 8990000, 0, "Accessories", false),
    new Product("P008", "iPad Pro 12.9\"", 28990000, 10, "Tablet", true)
];

console.log("=".repeat(60));
console.log("DANH SÁCH SẢN PHẨM KHỞI TẠO");
console.log("=".repeat(60));
console.log(JSON.stringify(products, null, 2));
console.log("\n");


// CÂU 3: Tạo mảng mới chỉ chứa name, price của mỗi sản phẩm

console.log("=".repeat(60));
console.log("CÂU 3: Mảng chứa tên và giá sản phẩm");
console.log("=".repeat(60));
const productNamesAndPrices = products.map(product => ({
    name: product.name,
    price: product.price
}));
console.log(productNamesAndPrices);
console.log("\n");


// CÂU 4: Lọc ra các sản phẩm còn hàng trong kho (quantity > 0)

console.log("=".repeat(60));
console.log("CÂU 4: Các sản phẩm còn hàng trong kho");
console.log("=".repeat(60));
const inStockProducts = products.filter(product => product.quantity > 0);
console.log(`Số lượng sản phẩm còn hàng: ${inStockProducts.length}`);
console.log(inStockProducts.map(p => `${p.name} - Còn ${p.quantity} chiếc`));
console.log("\n");

// CÂU 5: Kiểm tra xem có ít nhất một sản phẩm có giá > 30,000,000 hay không

console.log("=".repeat(60));
console.log("CÂU 5: Kiểm tra sản phẩm có giá > 30,000,000");
console.log("=".repeat(60));
const hasExpensiveProduct = products.some(product => product.price > 30000000);
console.log(`Có ít nhất một sản phẩm giá > 30,000,000: ${hasExpensiveProduct}`);

// Liệt kê các sản phẩm có giá > 30,000,000
const expensiveProducts = products.filter(product => product.price > 30000000);
console.log("Các sản phẩm có giá > 30,000,000:");
expensiveProducts.forEach(p => {
    console.log(`  - ${p.name}: ${p.price.toLocaleString('vi-VN')} đ`);
});
console.log("\n");


// CÂU 6: Kiểm tra xem tất cả sản phẩm thuộc danh mục "Accessories" có đang được bán (isAvailable = true) hay không

console.log("=".repeat(60));
console.log("CÂU 6: Kiểm tra tất cả Accessories có đang được bán");
console.log("=".repeat(60));

// Lọc các sản phẩm thuộc danh mục Accessories
const accessoriesProducts = products.filter(product => product.category === "Accessories");
console.log(`Số lượng sản phẩm Accessories: ${accessoriesProducts.length}`);

// Kiểm tra tất cả Accessories có đang được bán không
const allAccessoriesAvailable = accessoriesProducts.every(product => product.isAvailable === true);
console.log(`Tất cả sản phẩm Accessories đều đang được bán: ${allAccessoriesAvailable}`);

// Chi tiết các sản phẩm Accessories
console.log("\nChi tiết các sản phẩm Accessories:");
accessoriesProducts.forEach(p => {
    console.log(`  - ${p.name}: Đang bán = ${p.isAvailable}, Số lượng = ${p.quantity}`);
});
console.log("\n");


// CÂU 7: Tính tổng giá trị kho hàng (Giá trị kho = price × quantity)

console.log("=".repeat(60));
console.log("CÂU 7: Tính tổng giá trị kho hàng");
console.log("=".repeat(60));
const totalInventoryValue = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
}, 0);
console.log(`Tổng giá trị kho hàng: ${totalInventoryValue.toLocaleString('vi-VN')} đ`);

// Chi tiết giá trị kho của từng sản phẩm
console.log("\nChi tiết giá trị kho từng sản phẩm:");
products.forEach(p => {
    const value = p.price * p.quantity;
    console.log(`  - ${p.name}: ${p.price.toLocaleString('vi-VN')} đ × ${p.quantity} = ${value.toLocaleString('vi-VN')} đ`);
});
console.log("\n");


// CÂU 8: Dùng for...of để duyệt mảng products và in ra: Tên sản phẩm - Danh mục - Trạng thái

console.log("=".repeat(60));
console.log("CÂU 8: Duyệt mảng với for...of");
console.log("=".repeat(60));
for (const product of products) {
    const status = product.isAvailable ? "Đang bán" : "Ngừng bán";
    console.log(`${product.name} - ${product.category} - ${status}`);
}
console.log("\n");

// -----------------------------------------------------
// CÂU 9: Dùng for...in để in ra tên thuộc tính và giá trị tương ứng
// -----------------------------------------------------
console.log("=".repeat(60));
console.log("CÂU 9: Dùng for...in để in thuộc tính và giá trị");
console.log("=".repeat(60));

// Lấy một sản phẩm làm ví dụ (sản phẩm đầu tiên)
const sampleProduct = products[0];
console.log(`\nChi tiết thuộc tính của "${sampleProduct.name}":`);
for (const key in sampleProduct) {
    console.log(`  ${key}: ${sampleProduct[key]}`);
}
console.log("\n");

// -----------------------------------------------------
// CÂU 10: Lấy danh sách tên các sản phẩm đang bán và còn hàng
// -----------------------------------------------------
console.log("=".repeat(60));
console.log("CÂU 10: Danh sách sản phẩm đang bán VÀ còn hàng");
console.log("=".repeat(60));

// Đang bán (isAvailable = true) VÀ còn hàng (quantity > 0)
const availableAndInStockProducts = products.filter(
    product => product.isAvailable === true && product.quantity > 0
);

// Lấy danh sách tên
const availableProductNames = availableAndInStockProducts.map(product => product.name);

console.log(`Số lượng sản phẩm đang bán và còn hàng: ${availableProductNames.length}`);
console.log("\nDanh sách các sản phẩm:");
availableProductNames.forEach((name, index) => {
    console.log(`${index + 1}. ${name}`);
});

console.log("\n" + "=".repeat(60));
console.log("HOÀN THÀNH TẤT CẢ CÁC CÂU HỎI!");
console.log("=".repeat(60));
