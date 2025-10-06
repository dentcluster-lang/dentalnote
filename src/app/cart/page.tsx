'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 'p1',
      name: '3M ESPE Imprint™ 4 VPS 인상재',
      brand: '3M',
      category: '인상재',
      price: 89000,
      originalPrice: 120000,
      discount: 26,
      quantity: 2,
      image: '🦷',
      selected: true,
      inStock: true
    },
    {
      id: 2,
      productId: 'p2',
      name: 'Straumann® BLX Implant System',
      brand: 'Straumann',
      category: '임플란트',
      price: 385000,
      originalPrice: 420000,
      discount: 8,
      quantity: 1,
      image: '🔧',
      selected: true,
      inStock: true
    },
    {
      id: 3,
      productId: 'p3',
      name: 'GC Fuji IX GP EXTRA',
      brand: 'GC',
      category: '충전재',
      price: 68000,
      originalPrice: 75000,
      discount: 9,
      quantity: 3,
      image: '💊',
      selected: true,
      inStock: true
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [showCouponList, setShowCouponList] = useState(false);
  const [allSelected, setAllSelected] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const availableCoupons = [
    { code: 'WELCOME10', discount: 10, name: '신규가입 10% 할인' },
    { code: 'DENTAL20', discount: 20, name: '치과재료 20% 할인' },
    { code: 'VIP15', discount: 15, name: 'VIP 고객 15% 할인' }
  ];

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleSelectItem = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = () => {
    const newState = !allSelected;
    setAllSelected(newState);
    setCartItems(items =>
      items.map(item => ({ ...item, selected: newState }))
    );
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setShowCouponList(false);
    } else {
      alert('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const shippingFee = subtotal > 100000 ? 0 : 3000;
  const total = subtotal - discountAmount + shippingFee;

  const recommendedProducts = [
    { id: 'r1', name: 'Dentsply ProTaper', price: 145000, image: '📍' },
    { id: 'r2', name: 'Ivoclar IPS e.max', price: 245000, image: '👑' },
    { id: 'r3', name: 'Ormco Damon Clear', price: 890000, image: '✨' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
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
                  장바구니
                </p>
              </div>
            </div>

            <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button onClick={() => router.push('/')} style={navButtonStyle}>
                계속 쇼핑하기
              </button>
              <button onClick={() => router.push('/profile')} style={navButtonStyle}>
                주문내역
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 진행 상태 바 */}
      <div style={{ backgroundColor: 'white', padding: '24px 0', borderBottom: '1px solid #e9ecef' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '25%',
              right: '25%',
              height: '2px',
              backgroundColor: '#e9ecef',
              zIndex: 0
            }} />
            {['장바구니', '주문/결제', '완료'].map((step, idx) => (
              <div key={step} style={{ 
                flex: 1, 
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  margin: '0 auto 8px',
                  borderRadius: '50%',
                  background: idx === 0 ? 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                  border: idx === 0 ? 'none' : '2px solid #e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: idx === 0 ? 'white' : '#868e96',
                  fontWeight: 'bold'
                }}>
                  {idx + 1}
                </div>
                <p style={{ 
                  fontSize: '14px', 
                  color: idx === 0 ? '#667eea' : '#868e96',
                  fontWeight: idx === 0 ? '600' : '400'
                }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
          {/* 장바구니 아이템 */}
          <div>
            {/* 전체 선택 바 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>
                    전체 선택 ({selectedItems.length}/{cartItems.length})
                  </span>
                </label>
                <button
                  onClick={() => {
                    const selected = cartItems.filter(item => item.selected);
                    selected.forEach(item => handleRemoveItem(item.id));
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    color: '#868e96',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  선택 삭제
                </button>
              </div>
            </div>

            {/* 장바구니 아이템 리스트 */}
            {cartItems.map(item => (
              <div key={item.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.3s'
              }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleSelectItem(item.id)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  
                  <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px'
                  }}>
                    {item.image}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', color: '#868e96', marginBottom: '4px' }}>
                      {item.brand}
                    </p>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#495057' }}>
                      {item.category}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      style={quantityButtonStyle}
                    >
                      −
                    </button>
                    <span style={{ 
                      padding: '8px 16px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      minWidth: '50px',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      style={quantityButtonStyle}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '120px' }}>
                    {item.discount > 0 && (
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#868e96', 
                        textDecoration: 'line-through',
                        marginBottom: '4px'
                      }}>
                        ₩{(item.originalPrice * item.quantity).toLocaleString()}
                      </p>
                    )}
                    <p style={{ fontSize: '20px', fontWeight: '700' }}>
                      ₩{(item.price * item.quantity).toLocaleString()}
                    </p>
                    {item.discount > 0 && (
                      <span style={{
                        fontSize: '12px',
                        color: '#ff6b6b',
                        fontWeight: '600',
                        backgroundColor: '#ffe0e0',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {item.discount}% OFF
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#adb5bd',
                      fontSize: '20px'
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            {/* 추천 상품 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                함께 구매하면 좋은 상품
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {recommendedProducts.map(product => (
                  <div key={product.id} style={{
                    padding: '16px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e9ecef';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                      {product.image}
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                      {product.name}
                    </p>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#667eea' }}>
                      ₩{product.price.toLocaleString()}
                    </p>
                    <button style={{
                      marginTop: '12px',
                      padding: '8px 16px',
                      backgroundColor: '#f8f9fa',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      담기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 주문 요약 */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                주문 요약
              </h3>

              {/* 쿠폰 적용 */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    placeholder="쿠폰 코드 입력"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={applyCoupon}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#495057',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    적용
                  </button>
                </div>
                <button
                  onClick={() => setShowCouponList(!showCouponList)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f8f9fa',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#667eea',
                    cursor: 'pointer'
                  }}
                >
                  사용 가능한 쿠폰 보기
                </button>
                {showCouponList && (
                  <div style={{
                    marginTop: '8px',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    {availableCoupons.map(coupon => (
                      <div key={coupon.code} style={{
                        padding: '8px 0',
                        borderBottom: '1px solid #dee2e6',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setCouponCode(coupon.code)}>
                        <strong>{coupon.code}</strong> - {coupon.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {appliedCoupon && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontSize: '14px'
                }}>
                  ✅ {appliedCoupon.name} 적용됨
                </div>
              )}

              <div style={{ borderTop: '1px solid #e9ecef', paddingTop: '20px' }}>
                <div style={summaryRowStyle}>
                  <span>상품 금액</span>
                  <span>₩{subtotal.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div style={summaryRowStyle}>
                    <span style={{ color: '#ff6b6b' }}>쿠폰 할인</span>
                    <span style={{ color: '#ff6b6b' }}>
                      -₩{discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div style={summaryRowStyle}>
                  <span>배송비</span>
                  <span>
                    {shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p style={{ fontSize: '12px', color: '#868e96', marginTop: '8px' }}>
                    ₩100,000 이상 구매시 무료배송
                  </p>
                )}
                
                <div style={{
                  borderTop: '2px solid #212529',
                  marginTop: '20px',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '600' }}>
                    총 결제금액
                  </span>
                  <span style={{ 
                    fontSize: '24px', 
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ₩{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                disabled={selectedItems.length === 0}
                style={{
                  width: '100%',
                  padding: '16px',
                  marginTop: '20px',
                  background: selectedItems.length > 0 ?
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e9ecef',
                  color: selectedItems.length > 0 ? 'white' : '#868e96',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                  boxShadow: selectedItems.length > 0 ? 
                    '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                구매하기 ({selectedItems.length}개)
              </button>

              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span>✅</span> 안전한 결제 시스템
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span>🚚</span> 빠른 배송 (1-2일)
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>↩️</span> 7일 이내 반품 가능
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const navButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'white',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s'
};

const quantityButtonStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  border: '1px solid #dee2e6',
  backgroundColor: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  fontSize: '15px'
};
