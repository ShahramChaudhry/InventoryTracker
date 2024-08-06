// // pages/inventory.tsx
// import React from 'react';
// import Head from 'next/head';
// import AddItemForm from '../components/AddItemForm';
// import SearchItem from '../components/SearchItem';
// import '../styles/globals.css';
// import InventoryPage from '../components/InventoryPage';

// export default function Inventory() {
//   return <InventoryPage />;
// }

// export default function Inventory() {
//   return (
//     <div className="container">
//       <Head>
//         <title>Pantry Tracker</title>
//         <meta name="description" content="Track your pantry items" />
//       </Head>
//       <main className="main">
//         <h1 className="title">Welcome to Pantry Tracker</h1>
//         <p className="description">Manage and track your pantry items easily.</p>
//         <AddItemForm />
//         <SearchItem />
//       </main>
//     </div>
//   );
// }
import InventoryPage from '../components/InventoryPage';

export default function Inventory() {
  return <InventoryPage />;
}

