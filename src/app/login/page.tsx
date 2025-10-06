'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleLogin = () => {
    if (isAdminMode) {
      // 관리자 로그인
      if (email === 'admin@dental.com' && password === 'admin123') {
        localStorage.setItem('user', JSON.stringify({ 
          name: '관리자', 
          email: email,
          isAdmin: true 
        }));
        alert('관리자로 로그인되었습니다!');
        router.push('/admin');
      } else {
        alert('관리자 계정 정보가 올바르지 않습니다.');
      }
    } else {
      // 일반 사용자 로그인
      localStorage.setItem('user', JSON.stringify({ 
        name: '김치과', 
        email: email,
        isAdmin: false 
      }));
      alert('로그인 성공!');
      router.push('/');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '48px',
        borderRadius: '20px',
        width: '450px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* 로고 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            🦷
          </div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            DentalAI
          </h1>
          <p style={{ color: '#868e96', marginTop: '8px' }}>
            {isAdminMode ? '관리자 로그인' : '회원 로그인'}
          </p>
        </div>

        {/* 모드 전환 탭 */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setIsAdminMode(false)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: !isAdminMode ? 'white' : 'transparent',
              boxShadow: !isAdminMode ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
              fontWeight: !isAdminMode ? '600' : '500',
              color: !isAdminMode ? '#667eea' : '#868e96',
              transition: 'all 0.3s'
            }}
          >
            일반 회원
          </button>
          <button
            onClick={() => setIsAdminMode(true)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: isAdminMode ? 'white' : 'transparent',
              boxShadow: isAdminMode ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
              fontWeight: isAdminMode ? '600' : '500',
              color: isAdminMode ? '#764ba2' : '#868e96',
              transition: 'all 0.3s'
            }}
          >
            관리자
          </button>
        </div>

        {/* 로그인 폼 */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#495057'
          }}>
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isAdminMode ? 'admin@dental.com' : 'example@dental.com'}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#495057'
          }}>
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isAdminMode ? 'admin123' : '••••••••'}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />
        </div>

        {/* 테스트 계정 정보 */}
        {isAdminMode && (
          <div style={{
            padding: '16px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '13px'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '4px' }}>
              📌 테스트 계정 정보
            </p>
            <p>Email: admin@dental.com</p>
            <p>Password: admin123</p>
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '14px',
            background: isAdminMode ? 
              'linear-gradient(135deg, #495057 0%, #212529 100%)' :
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {isAdminMode ? '관리자 로그인' : '로그인'}
        </button>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          {!isAdminMode && (
            <>
              <a href="#" style={{ color: '#868e96', fontSize: '14px', textDecoration: 'none' }}>
                비밀번호 찾기
              </a>
              <span style={{ margin: '0 12px', color: '#dee2e6' }}>|</span>
              <a 
                onClick={() => router.push('/signup')}
                style={{ color: '#667eea', fontSize: '14px', textDecoration: 'none', cursor: 'pointer', fontWeight: '600' }}
              >
                회원가입
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
