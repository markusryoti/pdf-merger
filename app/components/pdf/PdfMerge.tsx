/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/lines-between-class-members */
import path from 'path';
import React, { useState } from 'react';
import DraggableList from 'react-draggable-list';
import PDFMerger from 'pdf-merger-js';

import PdfFileItem from './PdfFileItem';
import { IPdfFileListItem, PdfFileListItemImpl } from './PdfFileListItem';

const { dialog } = require('electron').remote;

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
      // eslint-disable-next-line no-console
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
      .catch((err) => {
        throw new Error("Couldn't select output file");
      });
  };

  const doPdfMerge = async (): Promise<void> => {
    if (!outputFile) return;

    setLoading(true);
    const merger = new PDFMerger();
    srcFiles?.forEach((item) => merger.add(item.absolutePath));

    try {
      await merger.save(outputFile);
      setLoading(false);
    } catch (err) {
      throw new Error("Couldn't do merge");
    }
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
      <div className="box mt-5">
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
      <div className="box mt-5">
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
      <div className="box mt-5">
        <h2 className="subtitle">4. Merge</h2>
        <button
          type="button"
          className={`button is-primary ${loading ? 'is-loading' : ''}`}
          onClick={doPdfMerge}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default PdfMerge;
