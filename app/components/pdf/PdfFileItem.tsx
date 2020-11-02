/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IPdfFileListItem } from './PdfMerge';

interface PdfFileProps {
  item: IPdfFileListItem;
  itemSelected: number;
  dragHandleProps: object;
}

export default class PdfFileItem extends React.Component<PdfFileProps> {
  render() {
    const { item, dragHandleProps } = this.props;
    return (
      <li>
        <div className="box" {...dragHandleProps}>
          {item.fileName && <div>{item.fileName}</div>}
        </div>
      </li>
    );
  }
}
