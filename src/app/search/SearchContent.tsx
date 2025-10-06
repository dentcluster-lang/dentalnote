'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const category = searchParams?.get('category') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [viewMode, setViewMode] = useState('grid');
  
  // 샘플 데이터
  const [products] = useState([
    {
      id: 1,
      name: '3M ESPE 인상재',
      brand: '3M',
      price: 89000,
      image: '🦷',
      category: 'material',
      description: 'VPS 인상재 - 정밀 인상채득',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 2,
      name: 'Straumann BLX',
      brand: 'Straumann',
      price: 385000,
      image: '🔧',
      category: 'implant',
      description: '프리미엄 임플란트 시스템',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'GC Fuji IX GP',
      brand: 'GC',
      price: 68000,
      image: '💊',
      category: 'material',
      description: '글라스아이오노머 시멘트',
      rating: 4.6,
      reviews: 156
    }
  ]);

  const categories = [
    { id: 'all', name: '전체', icon: '📦' },
    { id: 'implant', name: '임플란트', icon: '🔧' },
    { id: 'material', name: '재료', icon: '🧪' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesQuery = query ? 
      p.name.toLowerCase().includes(query.toLowerCase()) : true;
    const matchesCategory = selectedCategory && selectedCategory !== 'all' ? 
      p.category === selectedCategory : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 onClick={() => router.push('/')} 
                style={{ 
                  cursor: 'pointer', 
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
              🦷 DentalAI Shop
            </h1>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => router.push('/cart')} 
                      style={{ 
                        padding: '8px 16px',
                        backgroundColor: '#fff3cd',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer'
                      }}>
                🛒 장바구니
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 카테고리 */}
      <div style={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef',
        padding: '16px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: '12px'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '8px 20px',
                backgroundColor: selectedCategory === cat.id ? '#339af0' : '#f1f3f5',
                color: selectedCategory === cat.id ? 'white' : '#495057',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 검색 결과 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <h2 style={{ marginBottom: '20px' }}>
          검색 결과 ({filteredProducts.length}개)
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} 
                 style={{
                   backgroundColor: 'white',
                   borderRadius: '12px',
                   overflow: 'hidden',
                   boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                   cursor: 'pointer',
                   transition: 'transform 0.2s'
                 }}
                 onMouseOver={(e) => {
                   e.currentTarget.style.transform = 'translateY(-4px)';
                 }}
                 onMouseOut={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                 }}
            >
              <div style={{
                height: '200px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px'
              }}>
                {product.image}
              </div>

              <div style={{ padding: '16px' }}>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#868e96',
                  marginBottom: '4px'
                }}>
                  {product.brand}
                </p>
                <h3 style={{ 
                  fontSize: '16px',
                  marginBottom: '8px'
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  fontSize: '13px',
                  color: '#495057',
                  marginBottom: '12px'
                }}>
                  {product.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '12px'
                }}>
                  <span style={{ color: '#ffd43b' }}>★</span>
                  <span style={{ fontSize: '13px' }}>
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}>
                  ₩{product.price.toLocaleString()}
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#339af0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3>검색 결과가 없습니다</h3>
            <p style={{ color: '#868e96' }}>
              다른 검색어나 카테고리를 선택해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
