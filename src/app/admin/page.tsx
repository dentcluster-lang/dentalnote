'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showProductModal, setShowProductModal] = useState(false);

  // 대시보드 통계
  const dashboardStats = [
    { 
      label: '오늘 매출', 
      value: '₩3,240,000', 
      change: '+12%', 
      icon: '💰',
      color: '#667eea'
    },
    { 
      label: '신규 주문', 
      value: '24건', 
      change: '+8%', 
      icon: '📦',
      color: '#764ba2'
    },
    { 
      label: '방문자 수', 
      value: '1,284명', 
      change: '+15%', 
      icon: '👥',
      color: '#51cf66'
    },
    { 
      label: '상담 문의', 
      value: '18건', 
      change: '+5%', 
      icon: '💬',
      color: '#ff6b6b'
    }
  ];

  // 최근 주문
  const recentOrders = [
    {
      id: 'ORD20240320001',
      customer: '김치과',
      product: '3M ESPE 인상재 외 2건',
      amount: 542000,
      status: '결제완료',
      statusColor: '#339af0',
      time: '10분 전'
    },
    {
      id: 'ORD20240320002',
      customer: '이치과',
      product: 'Straumann BLX 임플란트',
      amount: 385000,
      status: '배송준비',
      statusColor: '#f59f00',
      time: '30분 전'
    },
    {
      id: 'ORD20240320003',
      customer: '박치과',
      product: 'GC Fuji IX 외 4건',
      amount: 268000,
      status: '배송중',
      statusColor: '#51cf66',
      time: '1시간 전'
    }
  ];

  // 상품 관리
  const [products] = useState([
    {
      id: 1,
      name: '3M ESPE Imprint™ 4',
      category: '인상재',
      price: 89000,
      stock: 234,
      status: '판매중',
      image: '🦷'
    },
    {
      id: 2,
      name: 'Straumann® BLX',
      category: '임플란트',
      price: 385000,
      stock: 45,
      status: '판매중',
      image: '🔧'
    },
    {
      id: 3,
      name: 'GC Fuji IX GP',
      category: '충전재',
      price: 68000,
      stock: 0,
      status: '품절',
      image: '💊'
    }
  ]);

  // 고객 목록
  const customers = [
    {
      id: 1,
      name: '김치과',
      email: 'kim@dental.com',
      businessName: '행복한치과의원',
      grade: 'VIP',
      totalPurchase: '₩12,450,000',
      joinDate: '2024.01.15'
    },
    {
      id: 2,
      name: '이치과',
      email: 'lee@dental.com',
      businessName: '서울치과병원',
      grade: 'GOLD',
      totalPurchase: '₩8,230,000',
      joinDate: '2024.02.20'
    }
  ];

  // 매출 차트 데이터
  const salesData = [
    { day: '월', amount: 2800000 },
    { day: '화', amount: 3200000 },
    { day: '수', amount: 2900000 },
    { day: '목', amount: 3500000 },
    { day: '금', amount: 4200000 },
    { day: '토', amount: 2100000 },
    { day: '일', amount: 1800000 }
  ];

  const maxAmount = Math.max(...salesData.map(d => d.amount));

  // 사이드바 메뉴
  const sideMenus = [
    { id: 'dashboard', name: '대시보드', icon: '📊' },
    { id: 'products', name: '상품 관리', icon: '📦' },
    { id: 'orders', name: '주문 관리', icon: '🛒' },
    { id: 'customers', name: '고객 관리', icon: '👥' },
    { id: 'chat', name: '상담 관리', icon: '💬' },
    { id: 'promotions', name: '프로모션', icon: '🎁' },
    { id: 'analytics', name: '매출 통계', icon: '📈' },
    { id: 'settings', name: '설정', icon: '⚙️' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <header style={{ 
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              🦷
            </div>
            <div>
              <h1 style={{ 
                fontSize: '18px', 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                DentalAI Admin
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              position: 'relative',
              padding: '8px',
              backgroundColor: '#f8f9fa',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '20px'
            }}>
              🔔
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ff6b6b',
                borderRadius: '50%'
              }} />
            </button>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '20px' }}>👤</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>관리자</span>
            </div>

            <button
              onClick={() => router.push('/')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              사이트 보기
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* 사이드바 */}
        <aside style={{
          width: '240px',
          height: 'calc(100vh - 73px)',
          backgroundColor: 'white',
          borderRight: '1px solid #e9ecef',
          padding: '20px',
          position: 'sticky',
          top: '73px'
        }}>
          {sideMenus.map(menu => (
            <button
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              style={{
                width: '100%',
                padding: '12px 16px',
                marginBottom: '8px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: activeMenu === menu.id ? 
                  '#f3f0ff' : 'transparent',
                color: activeMenu === menu.id ? '#667eea' : '#495057',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeMenu === menu.id ? '600' : '500',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                if (activeMenu !== menu.id) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseOut={(e) => {
                if (activeMenu !== menu.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{menu.icon}</span>
              {menu.name}
            </button>
          ))}
        </aside>

        {/* 메인 콘텐츠 */}
        <main style={{ flex: 1, padding: '24px', maxWidth: 'calc(100% - 240px)' }}>
          {/* 대시보드 */}
          {activeMenu === 'dashboard' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                  대시보드
                </h2>
                <p style={{ color: '#868e96' }}>실시간 비즈니스 현황을 확인하세요</p>
              </div>

              {/* 통계 카드 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {dashboardStats.map(stat => (
                  <div key={stat.label} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    borderLeft: `4px solid ${stat.color}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <p style={{ fontSize: '14px', color: '#868e96', marginBottom: '8px' }}>
                          {stat.label}
                        </p>
                        <p style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
                          {stat.value}
                        </p>
                        <span style={{
                          fontSize: '12px',
                          color: stat.change.startsWith('+') ? '#51cf66' : '#ff6b6b',
                          fontWeight: '600'
                        }}>
                          {stat.change} vs 어제
                        </span>
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

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* 매출 차트 */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>주간 매출 현황</h3>
                    <select style={{
                      padding: '8px 12px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}>
                      <option>이번 주</option>
                      <option>지난 주</option>
                      <option>이번 달</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '200px', marginBottom: '12px' }}>
                    {salesData.map((data, idx) => (
                      <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '100%',
                          height: `${(data.amount / maxAmount) * 100}%`,
                          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                          borderRadius: '8px 8px 0 0',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                          <span style={{
                            position: 'absolute',
                            top: '-25px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '12px',
                            fontWeight: '600',
                            whiteSpace: 'nowrap'
                          }}>
                            {(data.amount / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <span style={{ marginTop: '8px', fontSize: '14px', color: '#868e96' }}>{data.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 최근 주문 */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                    실시간 주문
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {recentOrders.map(order => (
                      <div key={order.id} style={{
                        padding: '12px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '600', fontSize: '14px' }}>{order.customer}</span>
                          <span style={{
                            padding: '2px 6px',
                            backgroundColor: `${order.statusColor}20`,
                            color: order.statusColor,
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {order.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#495057', marginBottom: '4px' }}>
                          {order.product}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600' }}>
                            ₩{order.amount.toLocaleString()}
                          </span>
                          <span style={{ fontSize: '12px', color: '#868e96' }}>
                            {order.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '16px',
                    border: '1px solid #e9ecef',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    전체 보기
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 상품 관리 */}
          {activeMenu === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                    상품 관리
                  </h2>
                  <p style={{ color: '#868e96' }}>상품을 등록하고 관리하세요</p>
                </div>
                <button
                  onClick={() => setShowProductModal(true)}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  + 새 상품 등록
                </button>
              </div>

              {/* 상품 목록 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={tableHeaderStyle}>상품명</th>
                      <th style={tableHeaderStyle}>카테고리</th>
                      <th style={tableHeaderStyle}>가격</th>
                      <th style={tableHeaderStyle}>재고</th>
                      <th style={tableHeaderStyle}>상태</th>
                      <th style={tableHeaderStyle}>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                        <td style={tableCellStyle}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '20px'
                            }}>
                              {product.image}
                            </div>
                            <span style={{ fontWeight: '500' }}>{product.name}</span>
                          </div>
                        </td>
                        <td style={tableCellStyle}>{product.category}</td>
                        <td style={tableCellStyle}>₩{product.price.toLocaleString()}</td>
                        <td style={tableCellStyle}>
                          <span style={{
                            color: product.stock > 0 ? '#51cf66' : '#ff6b6b',
                            fontWeight: '600'
                          }}>
                            {product.stock}개
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <span style={{
                            padding: '4px 8px',
                            backgroundColor: product.status === '판매중' ? '#51cf6620' : '#ff6b6b20',
                            color: product.status === '판매중' ? '#51cf66' : '#ff6b6b',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {product.status}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={actionButtonStyle}>수정</button>
                            <button style={actionButtonStyle}>삭제</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 고객 관리 */}
          {activeMenu === 'customers' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                  고객 관리
                </h2>
                <p style={{ color: '#868e96' }}>고객 정보를 확인하고 관리하세요</p>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={tableHeaderStyle}>고객명</th>
                      <th style={tableHeaderStyle}>병원/회사</th>
                      <th style={tableHeaderStyle}>등급</th>
                      <th style={tableHeaderStyle}>총 구매액</th>
                      <th style={tableHeaderStyle}>가입일</th>
                      <th style={tableHeaderStyle}>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(customer => (
                      <tr key={customer.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                        <td style={tableCellStyle}>
                          <div>
                            <p style={{ fontWeight: '500' }}>{customer.name}</p>
                            <p style={{ fontSize: '13px', color: '#868e96' }}>{customer.email}</p>
                          </div>
                        </td>
                        <td style={tableCellStyle}>{customer.businessName}</td>
                        <td style={tableCellStyle}>
                          <span style={{
                            padding: '4px 8px',
                            backgroundColor: customer.grade === 'VIP' ? '#667eea20' : '#f59f0020',
                            color: customer.grade === 'VIP' ? '#667eea' : '#f59f00',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {customer.grade}
                          </span>
                        </td>
                        <td style={tableCellStyle}>{customer.totalPurchase}</td>
                        <td style={tableCellStyle}>{customer.joinDate}</td>
                        <td style={tableCellStyle}>
                          <button style={actionButtonStyle}>상세보기</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 기타 메뉴들 */}
          {['orders', 'chat', 'promotions', 'analytics', 'settings'].includes(activeMenu) && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '60px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>준비중입니다</h3>
              <p style={{ color: '#868e96' }}>이 기능은 곧 추가될 예정입니다</p>
            </div>
          )}
        </main>
      </div>

      {/* 상품 등록 모달 */}
      {showProductModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            width: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
              새 상품 등록
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  상품명
                </label>
                <input type="text" style={inputStyle} placeholder="상품명을 입력하세요" />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    카테고리
                  </label>
                  <select style={inputStyle}>
                    <option>임플란트</option>
                    <option>인상재</option>
                    <option>충전재</option>
                    <option>교정재료</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    브랜드
                  </label>
                  <input type="text" style={inputStyle} placeholder="브랜드명" />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    판매가격
                  </label>
                  <input type="number" style={inputStyle} placeholder="0" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    재고수량
                  </label>
                  <input type="number" style={inputStyle} placeholder="0" />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  상품 설명
                </label>
                <textarea 
                  style={{...inputStyle, minHeight: '100px', resize: 'vertical'}} 
                  placeholder="상품에 대한 설명을 입력하세요"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  상품 이미지
                </label>
                <div style={{
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px',
                  padding: '40px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
                  <p style={{ color: '#868e96' }}>클릭하여 이미지 업로드</p>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <button
                onClick={() => setShowProductModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #e9ecef',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                취소
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  padding: '16px',
  textAlign: 'left',
  fontSize: '14px',
  fontWeight: '600',
  color: '#495057'
};

const tableCellStyle: React.CSSProperties = {
  padding: '16px',
  fontSize: '14px',
  color: '#212529'
};

const actionButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: 'white',
  border: '1px solid #e9ecef',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none'
};
