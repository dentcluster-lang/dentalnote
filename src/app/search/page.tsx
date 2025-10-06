'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: '3M ESPE 인상재',
      price: 45000,
      image: '🦷',
      category: 'material',
      description: '정밀한 인상채득용 실리콘 인상재'
    },
    {
      id: 2,
      name: 'Dentsply 임플란트 시스템',
      price: 280000,
      image: '🔧',
      category: 'implant',
      description: '최신 임플란트 시스템'
    },
    {
      id: 3,
      name: 'GC 글라스아이오노머',
      price: 68000,
      image: '💊',
      category: 'material',
      description: '고강도 충전재'
    }
  ]);

  const filteredProducts = products.filter(p => 
    query ? p.name.toLowerCase().includes(query.toLowerCase()) : 
    category ? p.category === category : true
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* 헤더 */}
      <header style={{ 
        backgroundColor: 'white', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
            🦷 DentalAI Shop
          </h1>
        </div>
      </header>

      {/* 검색 바 */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <input
            type="text"
            defaultValue={query}
            placeholder="검색어를 입력하세요..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                router.push(`/search?q=${e.currentTarget.value}`);
              }
            }}
          />
        </div>
      </div>

      {/* 검색 결과 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h2>검색 결과: {query || category} ({filteredProducts.length}개)</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '10px' }}>
                {product.image}
              </div>
              <h3 style={{ marginBottom: '10px' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                {product.description}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                  ₩{product.price.toLocaleString()}
                </span>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#ffeb3b',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  장바구니
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
