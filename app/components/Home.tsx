import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import PdfMerge from './pdf/PdfMerge';

export default function Home(): JSX.Element {
  return (
    <div className={styles.backgroundcontainer} data-tid="backgroundcontainer">
      <div className="container has-background-light p-5">
        <PdfMerge />
      </div>
    </div>
  );
}
