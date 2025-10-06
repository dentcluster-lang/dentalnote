'use client';
import { useState } from 'react';

export default function ChatLogin({ onLogin }: any) {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = () => {
    if (username && userId) {
      const user = {
        id: userId,
        name: username,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=FFE082&color=fff`,
        status: '온라인'
      };
      localStorage.setItem('chatUser', JSON.stringify(user));
      onLogin(user);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>💬</div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Dental Talk
          </h1>
          <p style={{ color: '#666', marginTop: '10px' }}>
            카카오톡 스타일 채팅 앱
          </p>
        </div>

        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginBottom: '15px',
            outline: 'none'
          }}
        />

        <input
          type="text"
          placeholder="아이디를 입력하세요 (예: user123)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginBottom: '20px',
            outline: 'none'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#FEE500',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#3C1E1E',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FDD835'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
        >
          로그인
        </button>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#FFF9C4', borderRadius: '10px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            <strong>테스트 계정:</strong>
          </p>
          <div style={{ fontSize: '13px', color: '#888' }}>
            • 이름: 김철수 / ID: kim123<br/>
            • 이름: 이영희 / ID: lee456<br/>
            • 이름: 박민수 / ID: park789
          </div>
        </div>
      </div>
    </div>
  );
}
