'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // 슬라이드 자동 전환
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const banners = [
    {
      title: '최첨단 디지털 치과 솔루션',
      subtitle: 'AI 기반 제품 추천 시스템',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '🔬'
    },
    {
      title: '프리미엄 임플란트 특가',
      subtitle: '최대 30% 할인 이벤트',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🦴'
    },
    {
      title: '실시간 전문가 상담',
      subtitle: '24시간 온라인 지원',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '💬'
    }
  ];

  const categories = [
    { id: 'implant', name: '임플란트', icon: '🦴', color: '#e3f2fd', count: '234' },
    { id: 'material', name: '치과재료', icon: '🧪', color: '#f3e5f5', count: '189' },
    { id: 'equipment', name: '의료장비', icon: '⚙️', color: '#e8f5e9', count: '456' },
    { id: 'orthodontic', name: '교정재료', icon: '✨', color: '#fff3e0', count: '123' },
    { id: 'endodontic', name: '근관치료', icon: '💉', color: '#fce4ec', count: '87' },
    { id: 'prosthetic', name: '보철재료', icon: '👑', color: '#e0f2f1', count: '342' }
  ];

  const popularProducts = [
    { id: 1, name: '3M ESPE 인상재', price: 89000, discount: 15, rating: 4.8, image: '🦷' },
    { id: 2, name: 'Straumann BLX', price: 385000, discount: 10, rating: 4.9, image: '🔧' },
    { id: 3, name: 'GC Fuji IX', price: 68000, discount: 20, rating: 4.6, image: '💊' },
    { id: 4, name: 'Dentsply ProTaper', price: 145000, discount: 0, rating: 4.7, image: '📍' }
  ];

  const brands = [
    { name: '3M', logo: '3M' },
    { name: 'Straumann', logo: 'STR' },
    { name: 'GC', logo: 'GC' },
    { name: 'Dentsply', logo: 'DS' },
    { name: 'Ivoclar', logo: 'IVO' },
    { name: 'Ormco', logo: 'ORM' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* 헤더 */}
      <header style={{ 
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* 로고 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer' 
            }} onClick={() => router.push('/')}>
              <div style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                🦷
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '22px', 
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                  DentalAI
                </h1>
                <p style={{ fontSize: '12px', color: '#868e96', margin: 0 }}>
                  Premium Dental Supply
                </p>
              </div>
            </div>

            {/* 네비게이션 */}
            <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              {user ? (
                <>
                  <button style={navStyle}>카테고리</button>
                  <button style={navStyle}>베스트</button>
                  <button style={navStyle}>신제품</button>
                  <button style={navStyle}>이벤트</button>
                  <div style={{ width: '1px', height: '20px', backgroundColor: '#e9ecef' }} />
                  <button onClick={() => router.push('/cart')} style={iconButtonStyle}>
                    🛒 <span style={badgeStyle}>2</span>
                  </button>
                  <button onClick={() => router.push('/chat')} style={iconButtonStyle}>
                    💬
                  </button>
                  <button onClick={() => router.push('/profile')} style={{
                    ...iconButtonStyle,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}>
                    {user.name}님
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => router.push('/login')} style={navStyle}>
                    로그인
                  </button>
                  <button onClick={() => router.push('/signup')} style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                  }}>
                    무료 회원가입
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* 히어로 배너 */}
      <section style={{ 
        height: '500px',
        background: banners[currentSlide].gradient,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }} />
        
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ maxWidth: '600px', color: 'white' }}>
            <div style={{ 
              fontSize: '80px',
              marginBottom: '20px',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              {banners[currentSlide].icon}
            </div>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: '700',
              marginBottom: '20px',
              animation: 'fadeInUp 0.8s ease-out'
            }}>
              {banners[currentSlide].title}
            </h2>
            <p style={{ 
              fontSize: '20px', 
              opacity: 0.9,
              marginBottom: '40px',
              animation: 'fadeInUp 1s ease-out'
            }}>
              {banners[currentSlide].subtitle}
            </p>
            <button style={{
              padding: '14px 32px',
              backgroundColor: 'white',
              color: '#764ba2',
              border: 'none',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              animation: 'fadeInUp 1.2s ease-out'
            }}>
              자세히 보기 →
            </button>
          </div>
        </div>

        {/* 슬라이드 인디케이터 */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px'
        }}>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '40px' : '10px',
                height: '10px',
                backgroundColor: currentSlide === idx ? 'white' : 'rgba(255,255,255,0.5)',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </section>

      {/* AI 검색 섹션 */}
      <section style={{ 
        backgroundColor: '#f8f9fa',
        padding: '60px 24px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>
              AI로 찾는 스마트 검색
            </h3>
            <p style={{ color: '#868e96', fontSize: '16px' }}>
              사진을 업로드하거나 텍스트로 원하는 제품을 찾아보세요
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 200px',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <input
                type="text"
                placeholder="예: 임플란트, 인상재, 교정 브라켓..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '16px 24px',
                  fontSize: '16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
              <button 
                onClick={() => router.push('/search?q=' + searchQuery)}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>
                검색하기
              </button>
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0', color: '#868e96' }}>
              또는
            </div>

            <label style={{
              display: 'block',
              padding: '40px',
              border: '2px dashed #dee2e6',
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.3s'
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.backgroundColor = '#f3f0ff';
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = '#dee2e6';
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              {imagePreview ? (
                <div>
                  <img src={imagePreview} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px' }} />
                  <p style={{ marginTop: '12px', color: '#667eea', fontWeight: '600' }}>
                    이미지로 검색하기
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📸</div>
                  <p style={{ fontSize: '16px', color: '#495057', fontWeight: '600' }}>
                    클릭하거나 이미지를 드래그하세요
                  </p>
                  <p style={{ fontSize: '14px', color: '#868e96', marginTop: '8px' }}>
                    JPG, PNG, GIF (최대 10MB)
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            카테고리별 쇼핑
          </h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => router.push('/search?category=' + cat.id)}
                style={{
                  backgroundColor: cat.color,
                  padding: '30px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{cat.icon}</div>
                <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{cat.name}</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>{cat.count}개 상품</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 상품 */}
      <section style={{ backgroundColor: '#f8f9fa', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '700' }}>베스트 셀러</h3>
            <button style={{ color: '#667eea', fontWeight: '600', cursor: 'pointer', border: 'none', background: 'none' }}>
              전체보기 →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {popularProducts.map(product => (
              <div key={product.id} style={productCardStyle}>
                <div style={{ height: '200px', backgroundColor: '#f1f3f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
                  {product.image}
                </div>
                <div style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>{product.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ color: '#ffd43b' }}>★</span>
                    <span style={{ fontSize: '14px' }}>{product.rating}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>
                      ₩{product.price.toLocaleString()}
                    </span>
                    {product.discount > 0 && (
                      <span style={{ fontSize: '14px', color: '#ff6b6b', fontWeight: '600' }}>
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 브랜드 */}
      <section style={{ padding: '60px 24px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            공식 파트너 브랜드
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
            {brands.map(brand => (
              <div key={brand.name} style={{
                width: '120px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '20px',
                color: '#868e96',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.color = '#667eea';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e9ecef';
                e.currentTarget.style.color = '#868e96';
              }}>
                {brand.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 플로팅 채팅 버튼 */}
      <button
        onClick={() => router.push('/chat')}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
          zIndex: 1000,
          transition: 'transform 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        💬
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const navStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  color: '#495057',
  transition: 'color 0.3s'
};

const iconButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: '1px solid #e9ecef',
  backgroundColor: 'white',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  position: 'relative' as const
};

const badgeStyle: React.CSSProperties = {
  position: 'absolute' as const,
  top: '-8px',
  right: '-8px',
  backgroundColor: '#ff6b6b',
  color: 'white',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: 'bold'
};

const productCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  transition: 'all 0.3s'
};
