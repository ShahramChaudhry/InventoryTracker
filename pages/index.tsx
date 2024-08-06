// // pages/index.tsx
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import LandingPage from '../components/LandingPage.js';

// export default function Home() {
//   return <LandingPage />;
// }
// const LandingPage = () => {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <Link href="/inventory">
//         <a>
//           <Image src="/inventory.svg" alt="Inventory" width={200} height={80} />
//         </a>
//       </Link>
//     </div>
//   );
// };

// export default LandingPage;
import LandingPage from '../components/LandingPage';

export default function Home() {
  return <LandingPage />;
}
