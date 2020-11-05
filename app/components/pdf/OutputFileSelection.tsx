import React from 'react';
import path from 'path';

interface Props {
  setResultPdfName: any;
  outputFile: string;
  goForwards: any;
  goBackwards: any;
}

const OutputFileSelection = ({
  setResultPdfName,
  outputFile,
  goForwards,
  goBackwards,
}: Props) => {
  return (
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
      <button type="button" onClick={goBackwards}>
        Go Backwards
      </button>
      <button type="button" onClick={goForwards}>
        Go Forwards
      </button>
    </div>
  );
};

export default OutputFileSelection;
