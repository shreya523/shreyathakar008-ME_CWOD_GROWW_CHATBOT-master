const { addProducts, addFAQs, addOrders, addUsers, linkUsersToOrders } = require("./fill_data");
//Calls DB seeding procedures sequentially
async function populateData() {
  await addUsers();
  await addFAQs();
  await addProducts();
  await addOrders();
  await linkUsersToOrders();
}

exports.populateData = populateData;
