import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

 const validatorHandler = (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          title: "Uno o mas parametros son incorrectos",
          details: errors.array(),
        });
    }
    next();
  } catch (err) {
    next(err)
  }
}

export default validatorHandler
