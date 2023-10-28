class ApiFeatures {
  constructor(query, queryStr) {
    //Passing the parameters we get fron the function calling
    this.query = query; //this.query is same as productModel.find()

    this.queryStr = queryStr; //this.queryStr stores the query from our params
  }

  //Search feature. When we search this function is called and it finds the keyword which we give
  search() {
    //taking the keyword from params
    const keyword = this.queryStr.keyword
      ? //if found
        {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case insensitive
          },
        }
      : //if not found
        {};

    //Finding the keyword to search in the database
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //Filter feature. Finding a product/category/price/rating
  filter() {
    //making a copy of queryStr
    const queryCopy = { ...this.queryStr };

    //Removing fields for category
    const removeFields = ["keyword", "page", "limit"];

    //deleting the keys from the queryCopy
    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter for price an rating
    let queryStr = JSON.stringify(queryCopy);

    //replacing gt|gte|lt|lte with $gt|$gte|$lt|$lte so that mongodb can recognise the range filter
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    //finding the filtered query in database
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    //Getting the current page
    const currentPage = Number(this.queryStr.page) || 1;

    //Number of products we want to skip to show from page 2 and onwards
    const skip = resultPerPage * (currentPage - 1);

    //Limiting and skipping the number of pages to be shown and skipped respectively
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
