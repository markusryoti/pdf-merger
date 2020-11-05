import React, { useState } from 'react';
import DraggableList from 'react-draggable-list';
import PdfFileItem from './PdfFileItem';
import { IPdfFileListItem } from './PdfFileListItem';

interface Props {
  srcFiles: ReadonlyArray<IPdfFileListItem>;
  onListChange: any;
  goForwards: any;
  goBackwards: any;
}

const PdfOrdering = ({
  srcFiles,
  onListChange,
  goForwards,
  goBackwards,
}: Props) => {
  const container = React.createRef<HTMLDivElement>();

  return (
    <div className="box page-container mt-3 is-flex is-flex-direction-column is-justify-content-space-between">
      <div>
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
      <div>
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
