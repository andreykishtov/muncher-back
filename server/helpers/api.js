module.exports = version => {
  return {
    location: `/api/${version}/locations`,
    users: `/api/${version}/users`,
    reviews: `/api/${version}/reviews`,
    locationsRoute: `./routes/api/${version}/locations`,
    usersRoute: `./routes/api/${version}/users`,
    reviewsRoute: `./routes/api/${version}/reviews`
  };
};
