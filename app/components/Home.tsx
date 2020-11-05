import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import PdfMergeMain from './pdf/PdfMergeMain';

export default function Home(): JSX.Element {
  return (
    <div
      className={`${styles.backgroundcontainer} pb-5`}
      data-tid="backgroundcontainer"
    >
      <div className="container p-5">
        <PdfMergeMain />
      </div>
    </div>
  );
}
