module.exports = class {
  constructor(query, request) {
    this.query = query;
    this.request = request;
  }

  filter() {
    const queryObject = { ...this.request };
    const excludedFields = ["sort", "limit", "search", "page"];
    // Remove fields that do not filter
    Object.keys(queryObject).forEach((key) => {
      if (excludedFields.includes(key)) {
        delete queryObject[key];
        return;
      }
      if (key === "brand" || key === "category") {
        queryObject[key] = queryObject[key];
      }
    });
    const transformedQuery = JSON.parse(
      JSON.stringify(queryObject).replaceAll(
        /\b(gte|gt|lte|lt)\b/g,
        (query) => `$${query}`
      )
    );
    this.query = this.query.find(transformedQuery);

    return this;
  }

  sort() {
    if (this.request.sort) {
      const sortQuery = this.request.sort.split(",").join(" ");
      this.query = this.query.sort(sortQuery);
    }
    return this;
  }

  paginate(limit) {
    const currentPage = this.request.page * 1 || 1;
    this.query = this.query.skip((currentPage - 1) * limit).limit(limit);
    return this;
  }

  limitFields() {
    if (this.request.limit) {
      const limitQuery = this.request.limit.split(",");
      this.query = this.query.select(limitQuery);
    }

    return this;
  }

  search() {
    if (this.request.search) {
      this.query = this.query.find({
        $text: { $search: this.request.search },
      });
    }

    return this;
  }
};
