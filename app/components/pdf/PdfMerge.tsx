import { copyFileSync } from 'fs';
import React, { useState } from 'react';

const { dialog } = require('electron').remote;

const PdfMerge = () => {
  const [srcFiles, setSrcFiles] = useState<string[]>();

  const selectPdfFiles = (): void => {
    const files = dialog.showOpenDialog({
      filters: [{ name: 'Pdf Files', extensions: ['pdf'] }],
      properties: ['multiSelections'],
    });

    files
      .then((res) => {
        const pdfs: string[] = res.filePaths;
        return setSrcFiles(pdfs);
      })
      .catch((err) => console.log(err));
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
          {srcFiles?.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ol>
      </div>
      <div className="box mt-5">
        <h2 className="subtitle">3. Merge</h2>
        <button type="button" className="button is-primary">
          Start
        </button>
      </div>
    </div>
  );
};

export default PdfMerge;
