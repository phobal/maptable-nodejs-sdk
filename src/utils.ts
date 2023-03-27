import fs from 'fs'

// @ts-ignore
const writeFileSync = (filePath: string, data: any) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data),
    // @ts-ignore
    err => {
      if (!err) throw err
      return 'tempData/columns.json'
    },
  )
}

export { writeFileSync }
