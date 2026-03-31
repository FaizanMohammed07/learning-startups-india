const { authRequired } = require('../../middlewares/authMiddleware');
const { asyncHandler } = require('../../utils/asyncHandler');
const controller = require('./certificates.controller');
const { Certificate } = require('./certificate.model');
const express = require('express');
const router = express.Router();

// GET /api/v1/certificates
router.get('/', authRequired, asyncHandler(controller.listCertificates));
// POST /api/v1/certificates/generate
router.post('/generate', authRequired, asyncHandler(controller.generateCertificate));

// GET /api/v1/certificates/verify/:certificateNumber (public)
router.get(
  '/verify/:certificateNumber',
  asyncHandler(async (req, res) => {
    const cert = await Certificate.findOne({
      certificateNumber: String(req.params.certificateNumber),
    }).lean();
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.json({
      success: true,
      data: {
        certificateNumber: cert.certificateNumber,
        userName: cert.userName,
        courseTitle: cert.courseTitle,
        completionDate: cert.completionDate,
        isVerified: cert.isVerified,
      },
    });
  })
);

module.exports = { certificatesRouter: router };
