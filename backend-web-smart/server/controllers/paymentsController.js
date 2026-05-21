// Payments controller.
// getPayments   — return payment history for the authenticated student
// submitPayment — record a new payment submission (pending verification)

const PaymentModel = require('../models/paymentModel');
const { success, error } = require('../utils/response');

const getPayments = async (req, res, next) => {
  try {
    const payments = await PaymentModel.getByStudent(req.user.id);
    return success(res, payments);
  } catch (err) {
    next(err);
  }
};

const submitPayment = async (req, res, next) => {
  try {
    const { amount, referenceNumber, method } = req.body;

    if (!amount || !referenceNumber || !method) {
      return error(res, 'amount, referenceNumber, and method are required', 400);
    }

    const payment = await PaymentModel.create({
      studentId: req.user.id,
      amount,
      referenceNumber,
      method,
      status: 'pending',
    });

    return success(res, payment, 'Payment submitted for verification', 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPayments, submitPayment };
