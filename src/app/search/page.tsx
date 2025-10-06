'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  
  // 샘플 데이터 (나중에 DB 연동)
  const [products] = useState([
    {
      id: 1,
      name: '3M ESPE Imprint™ 4',
      brand: '3M',
      price: 89000,
      originalPrice: 120000,
      discount: 26,
      image: '🦷',
      category: 'material',
      description: 'VPS 인상재 - 초정밀 디테일 재현',
      rating: 4.8,
      reviews: 234,
      badge: 'BEST',
      inStock: true
    },
    {
      id: 2,
      name: 'Straumann® BLX Implant System',
      brand: 'Straumann',
      price: 385000,
      originalPrice: 420000,
      discount: 8,
      image: '🔧',
      category: 'implant',
      description: '즉시 식립용 프리미엄 임플란트',
      rating: 4.9,
      reviews: 89,
      badge: 'NEW',
      inStock: true
    },
    {
      id: 3,
      name: 'GC Fuji IX GP EXTRA',
      brand: 'GC',
      price: 68000,
      originalPrice: 75000,
      discount: 9,
      image: '💊',
      category: 'material',
      description: '고강도 글라스아이오노머 시멘트',
      rating: 4.6,
      reviews: 156,
      badge: null,
      inStock: true
    },
    {
      id: 4,
      name: 'DENTSPLY ProTaper Gold',
      brand: 'Dentsply Sirona',
      price: 145000,
      originalPrice: 160000,
      discount: 9,
      image: '📍',
      category: 'endodontic',
      description: '열처리 NiTi 파일 시스템',
      rating: 4.7,
      reviews: 203,
      badge: 'HOT',
      inStock: true
    },
    {
      id: 5,
      name: 'Ivoclar IPS e.max CAD',
      brand: 'Ivoclar Vivadent',
      price: 245000,
      originalPrice: 280000,
      discount: 13,
      image: '👑',
      category: 'prosthetic',
      description: '리튬 디실리케이트 글라스 세라믹',
      rating: 4.9,
      reviews: 412,
      badge: 'BEST',
      inStock: false
    },
    {
      id: 6,
      name: 'Ormco Damon Clear2',
      brand: 'Ormco',
      price: 890000,
      originalPrice: 950000,
      discount: 6,
      image: '✨',
      category: 'orthodontic',
      description: '투명 셀프라이게이팅 브라켓',
      rating: 4.8,
      reviews: 67,
      badge: null,
      inStock: true
    }
  ]);

  const categories = [
    { id: 'all', name: '전체', icon: '📦' },
    { id: 'implant', name: '임플란트', icon: '🔧' },
    { id: 'material', name: '재료', icon: '🧪' },
    { id: 'endodontic', name: '근관치료', icon: '📍' },
    { id: 'prosthetic', name: '보철', icon: '👑' },
    { id: 'orthodontic', name: '교정', icon: '✨' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesQuery = query ? 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) : true;
    
    const matchesCategory = selectedCategory && selectedCategory !== 'all' ? 
      p.category === selectedCategory : true;
    
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    
    return matchesQuery && matchesCategory && matchesPrice;
  });

  // 정렬
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price_low': return a.price - b.price;
      case 'price_high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'discount': return b.discount - a.discount;
      default: return b.reviews - a.reviews;
    }
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 onClick={() => router.push('/')} 
                style={{ 
                  cursor: 'pointer', 
                  fontSize: '24px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
              <span style={{ fontSize: '28px' }}>🦷</span>
              DentalAI Shop
            </h1>
            
            {/* 검색바 */}
            <div style={{ 
              flex: '0 1 600px',
              position: 'relative'
            }}>
              <input
                type="text"
                defaultValue={query}
                placeholder="제품명, 브랜드, 카테고리 검색..."
                style={{
                  width: '100%',
                  padding: '12px 48px 12px 20px',
                  fontSize: '15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '50px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4dabf7'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    router.push(`/search?q=${e.currentTarget.value}`);
                  }
                }}
              />
              <button style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#339af0',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🔍
              </button>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button onClick={() => router.push('/cart')} 
                      style={{ 
                        padding: '8px 16px',
                        backgroundColor: '#fff3cd',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}>
                🛒 장바구니
              </button>
              <button onClick={() => router.push('/profile')}
                      style={{ 
                        padding: '8px 16px',
                        backgroundColor: '#e7f5ff',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}>
                👤 내정보
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 카테고리 바 */}
      <div style={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef',
        padding: '16px 0',
        position: 'sticky',
        top: '72px',
        zIndex: 99
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
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
                fontWeight: '600',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.backgroundColor = '#e9ecef';
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.backgroundColor = '#f1f3f5';
                }
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* 사이드바 필터 */}
          <aside style={{ 
            width: '260px',
            flexShrink: 0
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
                필터
              </h3>
              
              {/* 가격 범위 */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>
                  가격 범위
                </label>
                <div style={{ marginTop: '12px' }}>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    style={{ width: '100%' }}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    fontSize: '13px',
                    color: '#868e96'
                  }}>
                    <span>₩0</span>
                    <span>₩{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* 정렬 */}
              <div>
                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>
                  정렬
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '8px',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="recommended">추천순</option>
                  <option value="price_low">낮은 가격순</option>
                  <option value="price_high">높은 가격순</option>
                  <option value="rating">평점순</option>
                  <option value="discount">할인율순</option>
                </select>
              </div>
            </div>
          </aside>

          {/* 메인 컨텐츠 */}
          <main style={{ flex: 1 }}>
            {/* 결과 헤더 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
                {query && `"${query}" `}검색 결과 
                <span style={{ color: '#339af0', marginLeft: '8px' }}>
                  {sortedProducts.length}개
                </span>
              </h2>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: viewMode === 'grid' ? '#339af0' : '#f1f3f5',
                    color: viewMode === 'grid' ? 'white' : '#495057',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: viewMode === 'list' ? '#339af0' : '#f1f3f5',
                    color: viewMode === 'list' ? 'white' : '#495057',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ☰
                </button>
              </div>
            </div>

            {/* 제품 그리드 */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: viewMode === 'grid' ? 
                'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
              gap: '20px'
            }}>
              {sortedProducts.map(product => (
                <div key={product.id} 
                     style={{
                       backgroundColor: 'white',
                       borderRadius: '12px',
                       overflow: 'hidden',
                       boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                       cursor: 'pointer',
                       transition: 'all 0.3s',
                       display: viewMode === 'list' ? 'flex' : 'block',
                       position: 'relative'
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.transform = 'translateY(-4px)';
                       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                     }}
                >
                  {/* 배지 */}
                  {product.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      backgroundColor: product.badge === 'BEST' ? '#ff6b6b' :
                                     product.badge === 'NEW' ? '#51cf66' : '#ffd43b',
                      color: product.badge === 'NEW' ? 'white' : '#212529',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      zIndex: 1
                    }}>
                      {product.badge}
                    </span>
                  )}

                  {/* 이미지 영역 */}
                  <div style={{
                    width: viewMode === 'list' ? '120px' : '100%',
                    height: viewMode === 'list' ? '120px' : '200px',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '64px',
                    position: 'relative'
                  }}>
                    {product.image}
                    {!product.inStock && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px'
                      }}>
                        품절
                      </div>
                    )}
                  </div>

                  {/* 정보 영역 */}
                  <div style={{ 
                    padding: '16px',
                    flex: viewMode === 'list' ? 1 : 'none'
                  }}>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#868e96',
                      marginBottom: '4px',
                      fontWeight: '500'
                    }}>
                      {product.brand}
                    </p>
                    <h3 style={{ 
                      fontSize: '16px',
                      marginBottom: '8px',
                      lineHeight: '1.4',
                      fontWeight: '600'
                    }}>
                      {product.name}
                    </h3>
                    <p style={{ 
                      fontSize: '13px',
                      color: '#495057',
                      marginBottom: '12px',
                      lineHeight: '1.5'
                    }}>
                      {product.description}
                    </p>
                    
                    {/* 평점 */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '12px'
                    }}>
                      <span style={{ color: '#ffd43b' }}>★</span>
                      <span style={{ fontSize: '13px', fontWeight: '600' }}>
                        {product.rating}
                      </span>
                      <span style={{ fontSize: '12px', color: '#868e96' }}>
                        ({product.reviews})
                      </span>
                    </div>

                    {/* 가격 */}
                    <div style={{ marginBottom: '16px' }}>
                      {product.discount > 0 && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <span style={{
                            fontSize: '13px',
                            color: '#868e96',
                            textDecoration: 'line-through'
                          }}>
                            ₩{product.originalPrice.toLocaleString()}
                          </span>
                          <span style={{
                            fontSize: '13px',
                            color: '#ff6b6b',
                            fontWeight: 'bold'
                          }}>
                            {product.discount}%
                          </span>
                        </div>
                      )}
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#212529'
                      }}>
                        ₩{product.price.toLocaleString()}
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px'
                    }}>
                      <button
                        disabled={!product.inStock}
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: product.inStock ? '#fff3cd' : '#f1f3f5',
                          color: product.inStock ? '#212529' : '#868e96',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: product.inStock ? 'pointer' : 'not-allowed',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          if (product.inStock) {
                            e.currentTarget.style.backgroundColor = '#ffe066';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (product.inStock) {
                            e.currentTarget.style.backgroundColor = '#fff3cd';
                          }
                        }}
                      >
                        장바구니
                      </button>
                      <button
                        disabled={!product.inStock}
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: product.inStock ? '#339af0' : '#f1f3f5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: product.inStock ? 'pointer' : 'not-allowed',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          if (product.inStock) {
                            e.currentTarget.style.backgroundColor = '#228be6';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (product.inStock) {
                            e.currentTarget.style.backgroundColor = '#339af0';
                          }
                        }}
                      >
                        바로구매
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 결과 없음 */}
            {sortedProducts.length === 0 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '60px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ marginBottom: '8px' }}>검색 결과가 없습니다</h3>
                <p style={{ color: '#868e96' }}>
                  다른 검색어나 카테고리를 선택해보세요
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
