class UserUtils {
  async search(model, filter) {
    const searchTerm = {
      $or: [],
    };

    // Search by fullName
    if (filter.fullName) {
      searchTerm.$or.push({
        fullName: {
          $regex: filter.fullName,
          $options: "i",
        },
      });
    }

    // Filter by jobTitle
    if (filter.jobTitle) {
      searchTerm.$or.push({
        jobTitle: {
          $regex: filter.jobTitle,
          $options: "i",
        },
      });
    }

    // Filter by experience
    if (filter.experience) {
      searchTerm.$or.push({
        experience: {
          $regex: filter.experience,
          $options: "i",
        },
      });
    }

    // Exclude users with allowInSearch set to "no"
    if (filter.allowInSearch && filter.allowInSearch.toLowerCase() === "no") {
      searchTerm.$or.push({
        allowInSearch: "no",
      });
    } else {
      delete filter.allowInSearch; // Remove the allowInSearch property from the filter
    }

    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = model.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    // Executing query
    const results = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    next();
  }
}

module.exports = { UserUtils };
