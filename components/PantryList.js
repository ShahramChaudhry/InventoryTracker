"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button, TextField } from '@mui/material';

const PantryList = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'pantryItems'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = [];
      snapshot.forEach((doc) => itemsData.push({ ...doc.data(), id: doc.id }));
      console.log("Items retrieved from Firestore: ", itemsData);
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editQuantity < 0) {
      alert('Quantity cannot be less than 0');
      return;
    }
    try {
      const itemDoc = doc(db, 'pantryItems', editId);
      await updateDoc(itemDoc, {
        name: editName,
        quantity: parseInt(editQuantity, 10),
      });
      setEditId(null);
      setEditName('');
      setEditQuantity('');
    } catch (error) {
      console.error('Error updating item: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const itemDoc = doc(db, 'pantryItems', id);
      await deleteDoc(itemDoc);
      if (id === editId) {
        setEditId(null);
        setEditName('');
        setEditQuantity('');
      }
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <div>
      <h2>Pantry Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id === editId ? (
              <form onSubmit={handleUpdate}>
                <TextField
                  label="Item Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
                <TextField
                  label="Quantity"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Math.max(0, e.target.value))}
                  type="number"
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
                <Button onClick={() => handleDelete(item.id)} variant="contained" color="secondary">
                  Delete
                </Button>
              </form>
            ) : (
              <>
                {item.name} - {item.quantity}
                <Button onClick={() => handleEdit(item)}>Edit</Button>
                <Button onClick={() => handleDelete(item.id)} variant="contained" color="secondary">
                  Delete
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PantryList;
