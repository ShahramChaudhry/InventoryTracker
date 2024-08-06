import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.fullScreen}>
      <Link href="/inventory">
        <div className={styles.backgroundImage}>
          <Image
            src="/inventory.svg"
            alt="Inventory"
            layout="fill"
            className={styles.svgImage}
          />
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
