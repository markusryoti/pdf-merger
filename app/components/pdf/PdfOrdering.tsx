/* eslint-disable import/no-named-as-default */
import React from 'react';
import { IPdfFileListItem } from './PdfFileListItem';
import PdfFileOrderList from './PdfFileOrderList';

interface Props {
  srcFiles: ReadonlyArray<IPdfFileListItem>;
  setSrcFiles: React.Dispatch<
    React.SetStateAction<readonly IPdfFileListItem[]>
  >;
  goForwards: () => void;
  goBackwards: () => void;
}

const PdfOrdering = ({
  srcFiles,
  setSrcFiles,
  goForwards,
  goBackwards,
}: Props) => {
  return (
    <div className="box page-container mt-3 is-flex is-flex-direction-column">
      <div
        className="is-flex is-flex-direction-column"
        style={{ height: '90%' }}
      >
        <h2 className="subtitle">2. Select the order of Pdf Files</h2>
        <div style={{ overflow: 'auto' }}>
          <PdfFileOrderList srcFiles={srcFiles} setSrcFiles={setSrcFiles} />
        </div>
      </div>
      <div
        className="mt-1 is-flex is-align-items-flex-end"
        style={{ height: '100%' }}
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

export default PdfOrdering;
