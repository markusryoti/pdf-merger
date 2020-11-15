/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-cycle */
import path from 'path';
import fs from 'fs';
import React, { useState } from 'react';

import { PDFDocument } from 'pdf-lib';

import { IPdfFileListItem, PdfFileListItemImpl } from './PdfFileListItem';

import FileInput from './FileInput';
import PdfOrdering from './PdfOrdering';
import OutputFileSelection from './OutputFileSelection';
import MergeRun from './MergeRun';

const { dialog } = require('electron').remote;

enum FormState {
  InputSelection,
  FileOrdering,
  OutputSelection,
  Run,
}

const PdfMergeMain = () => {
  const [srcFiles, setSrcFiles] = useState<ReadonlyArray<IPdfFileListItem>>([]);
  const [outputFile, setOutputFile] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<number>(FormState.InputSelection);

  const selectPdfFiles = (): void => {
    const files = dialog.showOpenDialog({
      filters: [{ name: 'Pdf Files', extensions: ['pdf'] }],
      properties: ['multiSelections'],
    });

    files
      .then((res) => {
        const pdfs: string[] = res.filePaths;
        const pdfObjs: IPdfFileListItem[] = pdfs.map((pdf, index) => {
          return new PdfFileListItemImpl(index, pdf, path.basename(pdf));
        });
        return setSrcFiles(pdfObjs);
      })
      .catch((err) => console.log(err));
  };

  const setResultPdfName = (): void => {
    const file = dialog.showSaveDialog({
      filters: [{ name: 'Pdf Files', extensions: ['pdf'] }],
    });
    file
      .then((res) => {
        let selectedPath;
        if (res.filePath) {
          selectedPath = res.filePath;
          if (!selectedPath.endsWith('.pdf')) selectedPath += '.pdf';
          setOutputFile(selectedPath);
        } else {
          selectedPath = '';
        }
        return selectedPath;
      })
      .catch(() => {
        throw new Error("Couldn't select output file");
      });
  };

  const doPdfMerge = async (): Promise<number> => {
    if (!outputFile) {
      // console.log('No output file specified');
      throw new Error('No output file specified');
    }

    // Save start time
    const startTime: number = new Date().getTime();

    const pdfsToMerge = srcFiles?.map((item) =>
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

  const goForwards = (): void => {
    setFormState(formState + 1);
  };

  const goBackwards = (): void => {
    setFormState(formState - 1);
  };

  switch (formState) {
    case FormState.InputSelection:
      return (
        <FileInput
          srcFiles={srcFiles}
          selectPdfFiles={selectPdfFiles}
          goForwards={goForwards}
        />
      );
    case FormState.FileOrdering:
      return (
        <PdfOrdering
          srcFiles={srcFiles}
          setSrcFiles={setSrcFiles}
          goForwards={goForwards}
          goBackwards={goBackwards}
        />
      );
    case FormState.OutputSelection:
      return (
        <OutputFileSelection
          setResultPdfName={setResultPdfName}
          outputFile={outputFile}
          goForwards={goForwards}
          goBackwards={goBackwards}
        />
      );
    case FormState.Run:
      return (
        <MergeRun
          doPdfMerge={doPdfMerge}
          loading={loading}
          setLoading={setLoading}
          outputFile={outputFile}
          goBackwards={goBackwards}
        />
      );
    default:
      return <>Something is not right...</>;
  }
};

export default PdfMergeMain;
