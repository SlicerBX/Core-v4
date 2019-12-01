'use strict'

// Includes (include as many as you need; the bare essentials are included here)
const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
// const settings = require('../../util/settings')
// const logger = require(`${settings.util}/logger`)
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const { UNAUTHORIZED, BAD_REQUEST } = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
}

/**
 * Prints a given file, assuming the server is on the correct network.
 * @param req.body.name    name of file
 * @param req.body.type    type of file
 * @param req.body.buffer  buffer data
 * @return                 http status
 */
router.post('/print', function (req, res) {
  if (!req.body.token) return res.sendStatus(BAD_REQUEST)
  const token = req.body.token.replace(/^JWT\s/, '')

  jwt.verify(token, config.secretKey, function (error, decoded) {
    if (error) {
      // Unauthorized
      res.sendStatus(UNAUTHORIZED)
    } else {
      // Check the buffer to parse the amount of pages in the document
      // You can implement your own solution or use a third party library.
      // For example, here's my first approach:
      // https://stackoverflow.com/questions/10253669/how-to-get-the-number-of-pages-of-a-pdf-uploaded-by-user
      const pagesInDocument = 1

      // check if the user has enough pages left to print
      if (decoded.pagesPrinted + pagesInDocument > 30) {
        return res.status(409).send({
          message: `${decoded.email} does not have enough pages left to print the document.`
        })
      }

      // Utilize the Node-IPP Library here to send the data to the printer
      // There is not need to save it to the database before sending it off;
      // however, we can build that functionality in if we want to persist the printed
      // documents for whatever reason
      // https://www.npmjs.com/package/ipp
      // req.body.buffer = buffer data
      // req.body.type = type of file
      // req.body.name = name of file

      // The example I would go off of to start:
      // https://github.com/williamkapke/ipp/blob/master/examples/printPDF.js
      // While the above is a PDF, we should be able to support many documents with the same
      // mentality. Go ahead and get PDF working first, and then we have two options (I think):
      // - convert all documents to a PDF before printing; or
      // - find libraries for documents to be supported

      // Once getting one printer to work, I would then move towards batching between two printers
      // utilizing the methods to see if one is busy, etc
    }
  })
})