class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'skip',
      'limit',
      'fields',
      'search'
    ];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = JSON.parse(
      queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    );

    this.query = this.query.find(queryString);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      console.log(this.queryString.fields);
      const fields = this.queryString.fields.split(',').join(' ');

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    let page;
    let limit;
    let skip;

    limit = this.queryString.limit * 1 || 100;

    if (this.queryString.skip) {
      skip = this.queryString.skip * 1;
    } else {
      page = this.queryString.page * 1;
      skip = (page - 1) * limit;
    }

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
