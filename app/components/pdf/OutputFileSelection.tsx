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
    <div className="box page-container mt-3 is-flex is-flex-direction-column is-justify-content-space-between">
      <div>
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
      <div
        style={{ height: '100%' }}
        className="mt-2 is-flex is-align-items-flex-end"
      >
        <button
          type="button"
          onClick={goBackwards}
          className="button is-link is-light is-rounded mr-1"
        >
          <span className="icon">
            <i className="fas fa-angle-left fa-2x" />
          </span>
        </button>
        <button
          type="button"
          onClick={goForwards}
          className="button is-link is-light is-rounded"
        >
          <span className="icon">
            <i className="fas fa-angle-right fa-2x" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default OutputFileSelection;
