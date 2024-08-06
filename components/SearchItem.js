"use client";

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import styles from '../styles/InventoryPage.module.css';

const SearchItem = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState('');

  const normalizeName = (name) => {
    return name.trim().toLowerCase();
  };

  const handleSearch = async () => {
    setMessage('');
    setItem(null);

    const normalizedQuery = normalizeName(searchQuery);

    try {
      const q = query(
        collection(db, 'pantryItems'),
        where('normalizedName', '==', normalizedQuery)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const foundItem = querySnapshot.docs[0];
        setItem({ id: foundItem.id, ...foundItem.data() });
        setQuantity(foundItem.data().quantity);
      } else {
        setMessage('Item not found.');
      }
    } catch (error) {
      console.error('Error searching for item: ', error);
      setMessage('Error searching for item.');
    }
  };

  const handleUpdate = async () => {
    try {
      if (item && quantity >= 0) {
        await updateDoc(doc(db, 'pantryItems', item.id), { quantity: parseInt(quantity, 10) });
        setMessage('Item updated.');
      } else {
        alert('Quantity cannot be less than 0');
      }
    } catch (error) {
      console.error('Error updating item: ', error);
      setMessage('Error updating item.');
    }
  };

  const handleDelete = async () => {
    try {
      if (item) {
        await deleteDoc(doc(db, 'pantryItems', item.id));
        setMessage('Item removed.');
        setItem(null);
        setQuantity('');
      }
    } catch (error) {
      console.error('Error deleting item: ', error);
      setMessage('Error deleting item.');
    }
  };

  return (
    <div>
      <form className={styles.searchForm}>
        <TextField
          label="Search Item by Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            style: { color: 'black' },
          }}
        />
        <Button onClick={handleSearch} variant="contained" className={styles.searchButton}>
          Search Item
        </Button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      {item && (
        <div>
          <h3>Item Details</h3>
          <p>Product ID: {item.itemID}</p>
          <p>Name: {item.name}</p>
          <p>
            Quantity:
            <Button onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}>-</Button>
            {quantity}
            <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
          </p>
          <Button onClick={handleUpdate} variant="contained" className={styles.updateButton}>
            Update Quantity
          </Button>
          <Button onClick={handleDelete} variant="contained" className={styles.removeButton}>
            Remove Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchItem;
