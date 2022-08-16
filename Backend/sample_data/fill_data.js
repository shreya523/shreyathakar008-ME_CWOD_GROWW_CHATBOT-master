const { Product } = require("../models/product");
const { productArr, FAQArr, ordersArr, userArr } = require("./data");
const { FAQ } = require("../models/FAQ");
const { Order } = require("../models/order");
const { User } = require("../models/user");

async function addProducts() {
  console.log("Deleting all previous products");
  await Product.deleteMany().exec();
  console.log(
    "All products deleted..Creating new products of size: " + productArr.length
  );
  for (const product of productArr) {
    let productObj = new Product({ ...product });
    let productSaved = await productObj.save();
    console.log("Product saved with id: " + productSaved._id);
  }
  console.log("All products added successfully");
  return true;
}

async function addFAQs() {
  console.log("Deleting all the data in the FAQs collection...");
  await FAQ.deleteMany().exec();
  console.log(
    "All FAQs deleted. Total FAQ size " + FAQArr.length + "...Adding FAQs..."
  );

  for (const faq of FAQArr) {
    const FAQObj = new FAQ({ ...faq });
    let FAQSaved = await FAQObj.save();
    console.log("FAQ saved with id: " + FAQSaved._id);
  }
  console.log("FAQs added successfully");
  return true;
}
async function addOrders() {
  console.log("Deleting all previous orders");
  await Order.deleteMany().exec();
  console.log(
    "All orders deleted...Creating new orders of size: " + ordersArr.length
  );
  let allUsers = await User.find().exec();
  let i = 0;
  for (const order of ordersArr) {
    let productsToBeLinked = await Product.find({
      productCategory: order.category,
    }).exec();
    for (const product of productsToBeLinked) {
      order.products.push(product._id);
      break;
    }
    order.userId = allUsers[i]._id;
    order.units = 1;
    i++;
    if (i == allUsers.length) {
      i = 0;
    }
    let orderObj = new Order({ ...order });
    let orderSaved = await orderObj.save();
    console.log("Order saved with id: " + orderSaved._id);
  }
  console.log("All orders added successfully");
  return true;
}
//DB seeding procedure for adding mock users after cleanup
async function addUsers() {
  console.log("Deleting all the users in the user collection...");
  await User.deleteMany().exec();
  console.log(
    "All users deleted. Total users size: " + userArr.length + "...Adding users"
  );

  for (const user of userArr) {
    let userObj = new User(user);
    let userSaved = await userObj.save();
    console.log("User saved with id: " + userSaved._id);
  }
  console.log("All users added successfully");
  return true;
}
async function linkUsersToOrders() {
  console.log("Linking users with their orders...");
  let allOrders = await Order.find().exec();
  for (const order of allOrders) {
    let user = await User.findById(order.userId).exec();
    user.oreders.push(order._id);
    let updateUserPromise = () => {
      return new Promise((resolve, _) => {
        User.updateOne(
          { _id: user._id },
          { $set: { oreders: user.oreders } },
          { upsert: true }
        )
          .exec()
          .then((res) => {
            resolve({
              ...res,
            });
          });
      });
    };
    await updateUserPromise();
    console.log("User with id " + user._id + " is successfully updated");
  }
  console.log("All users linked with orders");
  return true;
}

exports.addProducts = addProducts;
exports.addFAQs = addFAQs;
exports.addOrders = addOrders;
exports.addUsers = addUsers;
exports.linkUsersToOrders = linkUsersToOrders;
