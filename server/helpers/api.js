module.exports = version => {
  return {
    users: `/api/${version}/users`,
    usersRoute: `./routes/api/${version}/users`,
    location: `/api/${version}/locations`,
    locationsRoute: `./routes/api/${version}/locations`,
    reviews: `/api/${version}/reviews`,
    reviewsRoute: `./routes/api/${version}/reviews`,
    createCustomerWithLocation: `/api/${version}/create/createCustomerWithLocation`,
    createCustomerWithLocationRoute: `./routes/api/${version}/createCustomerWithLocation`
  };
};
