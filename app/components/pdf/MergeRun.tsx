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
    <div className="box mt-3">
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
      <button type="button" onClick={goBackwards}>
        Go Backwards
      </button>
    </div>
  );
};

export default MergeRun;
