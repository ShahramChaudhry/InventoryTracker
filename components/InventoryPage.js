import React from 'react';
import Head from 'next/head';
import AddItemForm from '../components/AddItemForm';
import SearchItem from '../components/SearchItem';
import Link from 'next/link';
import styles from '../styles/InventoryPage.module.css';

const InventoryPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pantry Tracker</title>
        <meta name="description" content="Track your pantry items" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Pantry Tracker</h1>
        <p className={styles.description}>Manage and track your pantry items easily.</p>
        <div className={styles.addItemForm}>
          <AddItemForm />
        </div>
        <div className={styles.searchForm}>
          <SearchItem />
        </div>
        <Link href="/InventoryList">
          <button className={styles.inventoryButton}>See Inventory</button>
        </Link>
      </main>
    </div>
  );
};

export default InventoryPage;
