/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ItemType } from './DragListType';
import PdfFileItem from './PdfFileItem';
import { IPdfFileListItem } from './PdfFileListItem';

interface Props {
  srcFiles: ReadonlyArray<IPdfFileListItem>;
  setSrcFiles: any;
}

export const PdfFileOrderList = ({ srcFiles, setSrcFiles }: Props) => {
  const [, drop] = useDrop({
    accept: ItemType.LIST_ITEM,
    drop: () => console.log('dropped'),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = srcFiles[dragIndex];

    if (dragItem) {
      setSrcFiles((prevState: any) => {
        const copiedStateArray = [...prevState];
        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
        copiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return copiedStateArray;
      });
    }
  };

  return (
    <div ref={drop} className="pb-5">
      {srcFiles.map((fileObj, index) => {
        return (
          <div key={fileObj.id}>
            <PdfFileItem
              pdfItem={fileObj}
              moveCardHandler={moveCardHandler}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PdfFileOrderList;
