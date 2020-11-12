import React from 'react';
import { IPdfFileListItem } from './PdfFileListItem';

interface Props {
  srcFiles: ReadonlyArray<IPdfFileListItem>;
  selectPdfFiles: () => void;
  goForwards: () => void;
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
        <ol style={{ overflow: 'auto', maxHeight: '75%' }} className="mt-2">
          {srcFiles &&
            srcFiles.map((item) => {
              return (
                <li className="mt-1" key={item.absolutePath}>
                  {item.fileName}
                </li>
              );
            })}
        </ol>
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
