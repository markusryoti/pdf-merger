import React, { useState } from 'react';
import { IPdfFileListItem } from './PdfFileListItem';
import mergePdfs from './util/merge';

const { shell } = require('electron').remote;

interface Props {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  outputFile: string;
  srcFiles: readonly IPdfFileListItem[];
  goBackwards: () => void;
}

const MergeRun = ({
  loading,
  setLoading,
  outputFile,
  srcFiles,
  goBackwards,
}: Props) => {
  const [pdfMerged, setPdfMerged] = useState(false);
  const [error, setError] = useState(false);

  const handlePdfMergeClick = () => {
    setLoading(true);
    setError(false);
    setPdfMerged(false);
    mergePdfs(srcFiles, outputFile)
      .then((timeOutMilliseconds) => {
        setTimeout(() => setPdfMerged(true), timeOutMilliseconds);
        setTimeout(() => setLoading(false), timeOutMilliseconds);
        return 0;
      })
      .catch((err) => {
        console.log(err);
        setPdfMerged(false);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className="box page-container mt-3 is-flex is-flex-direction-column is-justify-content-space-between">
      <div className="is-flex is-flex-direction-column">
        <h2 className="subtitle">4. Merge</h2>
        <div>
          <button
            type="button"
            className={`button is-primary mr-3 ${loading ? 'is-loading' : ''}`}
            onClick={handlePdfMergeClick}
          >
            Start
          </button>
          {pdfMerged && (
            <button
              type="button"
              className="button is-success"
              onClick={() => shell.showItemInFolder(outputFile)}
            >
              Go To Location
            </button>
          )}
        </div>
      </div>
      <div
        style={{ height: '100%' }}
        className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
      >
        {(pdfMerged || error) && (
          <div
            style={{ height: '60%' }}
            className=" mb-5 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center"
          >
            {error ? (
              <>
                <h4 className="mt-3 title has-text-danger">
                  Something went wrong
                </h4>
                <span className="icon">
                  <i className="has-text-danger far fa-9x fa-times-circle" />
                </span>
              </>
            ) : (
              <>
                <h4 className="mt-3 title has-text-success">Success!</h4>
                <span className="icon">
                  <i className="has-text-success far fa-9x fa-check-circle" />
                </span>
              </>
            )}
          </div>
        )}
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
