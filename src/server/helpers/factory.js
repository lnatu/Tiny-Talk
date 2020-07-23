const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const catchError = require('./../utils/catchError');

exports.getAll = Model =>
  catchError(async (req, res, next) => {
    let searchObj = {};
    if (req.query.search) {
      const keyword = req.query.search;
      const regex = new RegExp(keyword, 'i');
      searchObj = {
        _id: { $nin: [req.user.id] },
        $text: { $search: regex }
      };
    }

    // Execute query
    const features = new APIFeatures(Model.find(searchObj), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchError(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError(`No data found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchError(async (req, res, next) => {
    const doc = await Model.create(req.body);

    return res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.updateOne = Model =>
  catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id || req.user.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!doc) {
      return next(new AppError(`No data found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.deleteOne = Model =>
  catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No data found with id ${req.params.id}`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
