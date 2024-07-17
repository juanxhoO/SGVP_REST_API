import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { reportService } from '../services';

const createReport = catchAsync(async (req, res) => {
  const { name, files, images, content, userId, vehicleId } = req.body;
  const spare = await reportService.createReport(name, files, images, content, userId, vehicleId);
  res.status(httpStatus.CREATED).send(spare);
});

const getReports = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reportService.queryReports(filter, options);
  res.send(result);
});

const getReport = catchAsync(async (req, res) => {
  const user = await reportService.getReportById(req.params.spareId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Spare not found');
  }
  res.send(user);
});

const updateReport = catchAsync(async (req, res) => {
  const user = await reportService.updateReportById(req.params.spareId, req.body);
  res.send(user);
});

const deleteReport = catchAsync(async (req, res) => {
  await reportService.deleteReportById(req.params.spareId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport
};
