'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '3M ESPE 인상재', price: 45000, quantity: 2 },
    { id: 2, name: 'GC 글라스아이오노머', price: 68000, quantity: 1 }
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ 
        backgroundColor: 'white', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          🦷 DentalAI Shop - 장바구니
        </h1>
      </header>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px'
        }}>
          <h2>장바구니 ({cartItems.length}개)</h2>
          
          {cartItems.map(item => (
            <div key={item.id} style={{
              borderBottom: '1px solid #eee',
              padding: '20px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3>{item.name}</h3>
                <p>₩{item.price.toLocaleString()} x {item.quantity}개</p>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                ₩{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}

          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2>총 금액</h2>
            <h2 style={{ color: '#4CAF50' }}>
              ₩{total.toLocaleString()}
            </h2>
          </div>

          <button style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '20px'
          }}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
