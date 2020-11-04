/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-cycle */
import path from 'path';
import fs from 'fs';
import React, { useState } from 'react';
import DraggableList from 'react-draggable-list';

import { PDFDocument } from 'pdf-lib';

import PdfFileItem from './PdfFileItem';
import { IPdfFileListItem, PdfFileListItemImpl } from './PdfFileListItem';

const { dialog, shell } = require('electron').remote;

const PdfMerge = () => {
  const container = React.createRef<HTMLDivElement>();
  const [srcFiles, setSrcFiles] = useState<ReadonlyArray<IPdfFileListItem>>([]);
  const [outputFile, setOutputFile] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const selectPdfFiles = (): void => {
    const files = dialog.showOpenDialog({
      filters: [{ name: 'Pdf Files', extensions: ['pdf'] }],
      properties: ['multiSelections'],
    });

    files
      .then((res) => {
        const pdfs: string[] = res.filePaths;
        const pdfObjs: IPdfFileListItem[] = pdfs.map((pdf) => {
          return new PdfFileListItemImpl(pdf, path.basename(pdf));
        });
        return setSrcFiles(pdfObjs);
      })
      .catch((err) => console.log(err));
  };

  const onListChange = (newList: ReadonlyArray<IPdfFileListItem>) => {
    setSrcFiles(newList);
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

  const doPdfMerge = async (): Promise<void> => {
    if (!outputFile) return;
    setLoading(true);

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

    fs.open(outputFile, 'w', (err, fd) => {
      if (err) console.log("Couldn't open output file");

      fs.write(fd, buf, 0, buf.length, null, (writeErr) => {
        if (writeErr) console.log("Couldn't write pdf");

        fs.close(fd, () => {
          const endTime: number = new Date().getTime();
          if (endTime - startTime > 1000) {
            setLoading(false);
          } else {
            setTimeout(() => setLoading(false), 1000);
          }
        });
      });
    });
  };

  return (
    <div>
      <div className="box mt-3">
        <h2 className="subtitle">1. Select Pdf Files</h2>
        <button
          type="button"
          className="button is-link"
          onClick={selectPdfFiles}
        >
          Browse
        </button>
      </div>
      <div className="box mt-3">
        <h2 className="subtitle">2. Select the order of Pdf Files</h2>
        <ol className="ml-5">
          <DraggableList<IPdfFileListItem, void, PdfFileItem>
            itemKey="fileName"
            template={PdfFileItem}
            list={srcFiles}
            onMoveEnd={(newList) => onListChange(newList)}
            container={container.current}
          />
        </ol>
      </div>
      <div className="box mt-3">
        <h2 className="subtitle">3. Select Output File</h2>
        <button
          type="button"
          className="button is-link"
          onClick={setResultPdfName}
        >
          Select Output File
        </button>
        <p className="mt-3">{outputFile && path.basename(outputFile)}</p>
      </div>
      <div className="box mt-3">
        <h2 className="subtitle">4. Merge</h2>
        <div className="is-flex">
          <button
            type="button"
            className={`button is-primary mr-3 is-medium ${
              loading ? 'is-loading' : ''
            }`}
            onClick={doPdfMerge}
          >
            Start
          </button>
          <button
            type="button"
            className="button is-success is-medium"
            onClick={() => shell.showItemInFolder(outputFile)}
          >
            Go To Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfMerge;
