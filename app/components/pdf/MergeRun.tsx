import React, { useState } from 'react';

const { shell } = require('electron').remote;

interface Props {
  loading: boolean;
  outputFile: string;
  doPdfMerge: any;
  goBackwards: any;
}

const MergeRun = ({ loading, outputFile, doPdfMerge, goBackwards }: Props) => {
  return (
    <div className="box page-container mt-3 is-flex is-flex-direction-column is-justify-content-space-between">
      <div>
        <h2 className="subtitle">4. Merge</h2>
        <div className="is-flex">
          <button
            type="button"
            className={`button is-primary mr-3 is-medium ${
              loading ? 'is-loading' : ''
            }`}
            onClick={doPdfMerge}
          >
            Start
          </button>
          <button
            type="button"
            className="button is-success is-medium"
            onClick={() => shell.showItemInFolder(outputFile)}
          >
            Go To Location
          </button>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={goBackwards}
          className="button is-link is-light is-rounded mt-3"
        >
          <span className="icon">
            <i className="fas fa-angle-left fa-2x" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default MergeRun;
