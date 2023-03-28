import fs from 'fs';
import { createArrayCsvWriter } from 'csv-writer';

// @ts-ignore
const writeFileSync = (filePath: string, data: any) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data),
    // @ts-ignore
    (err) => {
      if (!err) throw err;
      return 'tempData/columns.json';
    },
  );
};

const writeCSVFileSync = async (filePath: string, data: any[][]) => {
  const csvWriter = createArrayCsvWriter({
    path: filePath,
    header: data?.[0].map((_, index) => `title-${index}`),
  });
  await csvWriter.writeRecords(data);
};

export { writeFileSync, writeCSVFileSync };
