import React, { useState } from 'react';

interface Props {
  srcFiles: ReadonlyArray<IPdfFileListItem>;
  selectPdfFiles: any;
  goForwards: any;
}

const FileInput = ({ srcFiles, selectPdfFiles, goForwards }: Props) => {
  return (
    <div className="box page-container mt-3 is-flex is-flex-direction-column is-justify-content-space-between">
      <div>
        <h2 className="subtitle">1. Select Pdf Files</h2>
        <button
          type="button"
          className="button is-link"
          onClick={selectPdfFiles}
        >
          Browse
        </button>
        <ul className="mt-5">
          {srcFiles &&
            srcFiles.map((item) => {
              return <li key={item.absolutePath}>{item.fileName}</li>;
            })}
        </ul>
      </div>
      <div>
        <button
          type="button"
          onClick={goForwards}
          className="button is-link is-light is-rounded is-block mt-3 has-text-centered"
        >
          <span className="icon">
            <i className="fas fa-angle-right fa-2x" />
          </span>
        </button>
      </div>
    </div>
  );
};
export default FileInput;
