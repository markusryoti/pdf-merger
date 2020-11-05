import React, { useState } from 'react';

interface Props {
  selectPdfFiles: any;
  goForwards: any;
}

const FileInput = ({ selectPdfFiles, goForwards }: Props) => {
  return (
    <div className="box mt-3">
      <h2 className="subtitle">1. Select Pdf Files</h2>
      <button type="button" className="button is-link" onClick={selectPdfFiles}>
        Browse
      </button>
      <button type="button" onClick={goForwards}>
        Go Forwards
      </button>
    </div>
  );
};
export default FileInput;
