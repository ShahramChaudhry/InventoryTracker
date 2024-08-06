"use client";

import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import styles from '../styles/InventoryPage.module.css';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const normalizeName = (name) => {
    return name.trim().toLowerCase();
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Message will be shown for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && quantity >= 0) {
      const normalizedName = normalizeName(name);
      try {
        const q = query(collection(db, 'pantryItems'), where('normalizedName', '==', normalizedName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const existingItem = querySnapshot.docs[0];
          const newQuantity = existingItem.data().quantity + parseInt(quantity, 10);
          await updateDoc(doc(db, 'pantryItems', existingItem.id), { quantity: newQuantity });
          setMessage('Item updated.');
        } else {
          const itemIDDoc = doc(db, 'config', 'productIDCounter');
          const itemIDSnapshot = await getDoc(itemIDDoc);
          let lastID = itemIDSnapshot.data().lastID;
          let newID = lastID + 1;

          await updateDoc(itemIDDoc, { lastID: newID });

          await addDoc(collection(db, 'pantryItems'), {
            itemID: String(newID).padStart(8, '0'),
            name,
            normalizedName,
            quantity: parseInt(quantity, 10),
          });
          setMessage('New item added.');
        }

        setName('');
        setQuantity('');
      } catch (error) {
        console.error('Error adding/updating item: ', error);
        setMessage(`Error adding/updating item: ${error.message}`);
      }
    } else {
      alert('Quantity cannot be less than 0');
    }
  };

  return (
    <div>
      <form className={styles.addItemForm} onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          InputProps={{
            style: { color: 'black' }, // Ensure the text color is black
          }}
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(0, e.target.value))}
          type="number"
          required
          InputProps={{
            style: { color: 'black' }, // Ensure the text color is black
          }}
        />
        <Button type="submit" variant="contained" className={styles.addButton}>
          Add Item
        </Button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AddItemForm;
