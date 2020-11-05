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
      <button type="button" onClick={goBackwards}>
        Go Backwards
      </button>
      <button type="button" onClick={goForwards}>
        Go Forwards
      </button>
    </div>
  );
};

export default PdfOrdering;
