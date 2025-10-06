'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState({
    name: '김치과',
    email: 'kim@dental.com',
    phone: '010-1234-5678',
    businessName: '행복한치과의원',
    businessNumber: '123-45-67890',
    joinDate: '2024.01.15',
    grade: 'VIP',
    points: 12500,
    couponCount: 5,
    profileImage: '👨‍⚕️'
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: '병원',
      address: '서울시 강남구 테헤란로 123',
      detail: '덴탈빌딩 5층',
      zipCode: '06234',
      isDefault: true
    },
    {
      id: 2,
      name: '자택',
      address: '서울시 서초구 서초대로 456',
      detail: '아파트 101동 1001호',
      zipCode: '06789',
      isDefault: false
    }
  ]);

  const [orders] = useState([
    {
      id: 'ORD20240315001',
      date: '2024.03.15',
      items: '3M ESPE 인상재 외 2건',
      status: '배송완료',
      statusColor: '#51cf66',
      amount: 542000,
      image: '🦷'
    },
    {
      id: 'ORD20240310002',
      date: '2024.03.10',
      items: 'Straumann BLX 임플란트',
      status: '배송중',
      statusColor: '#339af0',
      amount: 385000,
      image: '🔧'
    },
    {
      id: 'ORD20240305003',
      date: '2024.03.05',
      items: 'GC Fuji IX 외 4건',
      status: '배송완료',
      statusColor: '#51cf66',
      amount: 268000,
      image: '💊'
    }
  ]);

  const menuItems = [
    { id: 'overview', name: '대시보드', icon: '📊' },
    { id: 'orders', name: '주문내역', icon: '📦' },
    { id: 'addresses', name: '배송지 관리', icon: '📍' },
    { id: 'payment', name: '결제수단', icon: '💳' },
    { id: 'coupons', name: '쿠폰함', icon: '🎫' },
    { id: 'wishlist', name: '찜목록', icon: '❤️' },
    { id: 'reviews', name: '리뷰관리', icon: '⭐' },
    { id: 'settings', name: '설정', icon: '⚙️' }
  ];

  const stats = [
    { label: '총 주문', value: '28건', icon: '📦', color: '#667eea' },
    { label: '이번달 구매', value: '3,240,000원', icon: '💰', color: '#764ba2' },
    { label: '적립 포인트', value: '12,500P', icon: '🪙', color: '#f59f00' },
    { label: '보유 쿠폰', value: '5장', icon: '🎟️', color: '#ff6b6b' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <header style={{ 
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
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
                  마이페이지
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/login');
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 프로필 배너 */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 24px 40px',
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
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              {user.profileImage}
            </div>
            
            <div style={{ flex: 1, color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '700', margin: 0 }}>
                  {user.name}
                </h2>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {user.grade}
                </span>
              </div>
              <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '4px' }}>
                {user.businessName} | {user.email}
              </p>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>
                가입일: {user.joinDate}
              </p>
            </div>

            <button style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#764ba2',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              프로필 수정
            </button>
          </div>

          {/* 통계 카드 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginTop: '40px'
          }}>
            {stats.map(stat => (
              <div key={stat.label} style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#868e96', marginBottom: '4px' }}>
                      {stat.label}
                    </p>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
          {/* 사이드 메뉴 */}
          <aside>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    marginBottom: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: activeTab === item.id ? 
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                    background: activeTab === item.id ? 
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                    color: activeTab === item.id ? 'white' : '#495057',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </aside>

          {/* 컨텐츠 영역 */}
          <main>
            {activeTab === 'overview' && (
              <div>
                {/* 최근 주문 */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                    최근 주문내역
                  </h3>
                  {orders.map(order => (
                    <div key={order.id} style={{
                      padding: '16px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px'
                        }}>
                          {order.image}
                        </div>
                        <div>
                          <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                            {order.items}
                          </p>
                          <p style={{ fontSize: '14px', color: '#868e96' }}>
                            {order.id} | {order.date}
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: `${order.statusColor}20`,
                          color: order.statusColor,
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          {order.status}
                        </span>
                        <p style={{ fontWeight: '600' }}>
                          ₩{order.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e9ecef',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    전체 주문내역 보기
                  </button>
                </div>

                {/* 배송지 정보 */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                    배송지 정보
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {addresses.map(addr => (
                      <div key={addr.id} style={{
                        padding: '16px',
                        border: addr.isDefault ? '2px solid #667eea' : '1px solid #e9ecef',
                        borderRadius: '8px',
                        position: 'relative'
                      }}>
                        {addr.isDefault && (
                          <span style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '12px',
                            padding: '2px 8px',
                            backgroundColor: '#667eea',
                            color: 'white',
                            fontSize: '12px',
                            borderRadius: '4px'
                          }}>
                            기본 배송지
                          </span>
                        )}
                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>
                          {addr.name}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#495057', marginBottom: '4px' }}>
                          {addr.address}
                        </p>
                        <p style={{ fontSize: '14px', color: '#495057' }}>
                          {addr.detail}
                        </p>
                        <p style={{ fontSize: '14px', color: '#868e96', marginTop: '8px' }}>
                          우편번호: {addr.zipCode}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                  전체 주문내역
                </h3>
                <div style={{ textAlign: 'center', padding: '60px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                  <p style={{ color: '#868e96' }}>주문내역 페이지 준비중</p>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                  배송지 관리
                </h3>
                <button style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}>
                  + 새 배송지 추가
                </button>
                {addresses.map(addr => (
                  <div key={addr.id} style={{
                    padding: '20px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>
                          {addr.name}
                          {addr.isDefault && (
                            <span style={{
                              marginLeft: '8px',
                              padding: '2px 6px',
                              backgroundColor: '#667eea',
                              color: 'white',
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              기본
                            </span>
                          )}
                        </h4>
                        <p style={{ color: '#495057', marginBottom: '4px' }}>
                          {addr.address}
                        </p>
                        <p style={{ color: '#495057' }}>
                          {addr.detail}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                          padding: '8px 16px',
                          border: '1px solid #e9ecef',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}>
                          수정
                        </button>
                        <button style={{
                          padding: '8px 16px',
                          border: '1px solid #e9ecef',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}>
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
