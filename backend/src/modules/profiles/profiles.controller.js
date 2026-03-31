const { ApiError } = require('../../utils/apiError');
const service = require('./profiles.service');

async function listMentors(req, res) {
  const mentors = await service.listMentors();
  res.json({ success: true, data: mentors });
}

async function createMentor(req, res) {
  const mentor = await service.createMentor(req.body);
  res.status(201).json({ success: true, data: mentor });
}

async function listInvestors(req, res) {
  const investors = await service.listInvestors();
  res.json({ success: true, data: investors });
}

async function createInvestor(req, res) {
  const investor = await service.createInvestor(req.body);
  res.status(201).json({ success: true, data: investor });
}

async function setMentorStatus(req, res) {
  const mentor = await service.updateMentorStatus(req.params.id, req.body.status);
  if (!mentor) throw new ApiError(404, 'Mentor not found');
  res.json({ success: true, data: mentor });
}

async function setInvestorStatus(req, res) {
  const investor = await service.updateInvestorStatus(req.params.id, req.body);
  if (!investor) throw new ApiError(404, 'Investor not found');
  res.json({ success: true, data: investor });
}

module.exports = {
  listMentors,
  createMentor,
  listInvestors,
  createInvestor,
  setMentorStatus,
  setInvestorStatus,
};
