import { access, mkdir, constants } from 'fs/promises'

export const validExistsDirectory = async (pathFile) => {
  try {
    await access(pathFile, constants.F_OK)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdir(pathFile, { recursive: true })
      console.log(`La ruta ${pathFile} ha sido creada.`)
    } else {
      throw err
    }
  }
}
