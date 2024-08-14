import multer from 'multer'
import { __dirname } from './basePath.js'
import { join, extname } from 'path'
import { validExistsDirectory } from './DirectoryValidator.js'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const pathUpload = join(__dirname, '/public/uploads')
    await validExistsDirectory(pathUpload)

    cb(null, pathUpload)
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4()

    cb(null, `${uuid}${extname(file.originalname)}`)
  }
})

export const upload = multer({ storage })
