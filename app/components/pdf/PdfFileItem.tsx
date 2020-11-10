/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/prefer-stateless-function */
import React, { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { ItemType } from './DragListType';
import { IPdfFileListItem } from './PdfFileListItem';

interface PdfFileProps {
  pdfItem: IPdfFileListItem;
  moveCardHandler: any;
  index: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const PdfFileItem = ({
  pdfItem,
  moveCardHandler,
  index,
}: PdfFileProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.LIST_ITEM,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType.LIST_ITEM },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="box is-small p-2">
      {pdfItem.fileName && <div>{pdfItem.fileName}</div>}
    </div>
  );
};

export default PdfFileItem;
