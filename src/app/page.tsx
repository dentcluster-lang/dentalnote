'use client';
export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ 
        backgroundColor: '#fff', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          textAlign: 'center',
          color: '#333'
        }}>
          🦷 DentalAI Shop - 치과재료 AI 쇼핑몰
        </h1>
      </header>
      
      <div style={{ 
        padding: '40px',
        textAlign: 'center',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
          AI로 찾는 스마트한 치과재료 쇼핑
        </h2>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            🚀 새로운 버전이 배포되었습니다!
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '20px',
            justifyContent: 'center',
            marginTop: '30px'
          }}>
            <button style={{
              padding: '15px 30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              로그인
            </button>
            <button style={{
              padding: '15px 30px',
              backgroundColor: '#ffeb3b',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              회원가입
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>주요 기능</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✅ AI 이미지 검색</li>
          <li>✅ 실시간 상담 채팅</li>
          <li>✅ 간편 결제 시스템</li>
          <li>✅ 구매 이력 관리</li>
        </ul>
      </div>
    </div>
  );
}
