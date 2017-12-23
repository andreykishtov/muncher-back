module.exports = version => {
  return {
    users: `/api/${version}/users`,
    usersRoute: `./routes/api/${version}/users`,
    location: `/api/${version}/location`,
    locationsRoute: `./routes/api/${version}/location`,
    reviews: `/api/${version}/reviews`,
    reviewsRoute: `./routes/api/${version}/reviews`,
    createCustomerWithLocation: `/api/${version}/create/location-with-customer`,
    createCustomerWithLocationRoute: `./routes/api/${version}/createLocationWithCustomer`
  };
};
