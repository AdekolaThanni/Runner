module.exports = class {
  constructor(query, request) {
    this.query = query;
    this.request = request;
  }

  filter() {
    const queryObject = { ...this.request };
    const includedFields = ["brand", "price"];
    Object.keys(queryObject).forEach((key) => {
      if (!includedFields.includes(key)) {
        delete queryObject[key];
      }
    });
    const transformedQuery = JSON.parse(
      JSON.stringify(queryObject)
        .replaceAll(/\b(gte|gt|lte|lt)\b/g, (query) => `$${query}`)
        .toLowerCase()
    );
    this.query = this.query.find(transformedQuery);

    return this;
  }
};
