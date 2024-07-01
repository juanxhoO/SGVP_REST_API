import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { subcircuitService } from '../services';

const createSubCircuit = catchAsync(async (req, res) => {
  const { name, image, code, circuitId } = req.body;
  const spare = await subcircuitService.createSubCircuit(name, image, code, circuitId);
  res.status(httpStatus.CREATED).send(spare);
});

const getSubCircuits = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subcircuitService.querySubCircuit(filter, options);
  res.send(result);
});

const getSubCircuit = catchAsync(async (req, res) => {
  console.log(req.params.subcircuitId);
  const user = await subcircuitService.getSubCircuitById(req.params.subcircuitId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subcircuit not found');
  }
  res.send(user);
});

const updateSubCircuit = catchAsync(async (req, res) => {
  const user = await subcircuitService.updateSubCircuitById(req.params.spareId, req.body);
  res.send(user);
});

const deleteSubCircuit = catchAsync(async (req, res) => {
  await subcircuitService.deleteSubCircuitById(req.params.subcircuitId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createSubCircuit,
  getSubCircuit,
  getSubCircuits,
  updateSubCircuit,
  deleteSubCircuit
};
