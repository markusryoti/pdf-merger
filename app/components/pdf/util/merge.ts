/* eslint-disable no-await-in-loop */
import fs from 'fs';

import { PDFDocument } from 'pdf-lib';
import { IPdfFileListItem } from '../PdfFileListItem';

const mergePdfs = async (
  pdfFiles: readonly IPdfFileListItem[],
  outputFile: string
): Promise<number> => {
  if (!outputFile) {
    // console.log('No output file specified');
    throw new Error('No output file specified');
  }

  // Save start time
  const startTime: number = new Date().getTime();

  const pdfsToMerge = pdfFiles?.map((item) =>
    fs.readFileSync(item.absolutePath)
  );

  const mergedPdf = await PDFDocument.create();

  // eslint-disable-next-line no-restricted-syntax
  for (const pdfBytes of pdfsToMerge) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const buf = await mergedPdf.save(); // Uint8Array

  const timeOutPromise: Promise<number> = new Promise((resolve, reject) => {
    fs.open(outputFile, 'w', (err, fd) => {
      if (err) {
        console.log("Couldn't open output file");
        throw new Error('Something went wrong');
      }

      fs.write(fd, buf, 0, buf.length, null, (writeErr) => {
        if (writeErr) {
          console.log("Couldn't write pdf");
          throw new Error('Something went wrong');
        }

        fs.close(fd, () => {
          let timeout: number;
          const endTime: number = new Date().getTime();
          const elapsedTime: number = endTime - startTime;

          if (elapsedTime > 3000) {
            timeout = 0;
          } else {
            timeout = 3000 - elapsedTime;
          }
          resolve(timeout);
        });
      });
    });
  });

  const timeout: number = await timeOutPromise;
  return timeout;
};

export default mergePdfs;
