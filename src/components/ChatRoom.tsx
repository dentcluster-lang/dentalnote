'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatRoom({ user, friend }: any) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: 1, sender: friend.id, text: '안녕하세요! 😊', time: '오전 10:30' },
    { id: 2, sender: user.id, text: '네, 안녕하세요!', time: '오전 10:32' },
    { id: 3, sender: friend.id, text: '오늘 일정 어떠세요?', time: '오전 10:33' },
  ]);
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const now = new Date();
      const timeString = now.getHours() > 12 
        ? `오후 ${now.getHours() - 12}:${now.getMinutes().toString().padStart(2, '0')}`
        : `오전 ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setMessages([...messages, {
        id: messages.length + 1,
        sender: user.id,
        text: message,
        time: timeString
      }]);
      setMessage('');

      // 자동 응답 시뮬레이션
      setTimeout(() => {
        const responses = [
          '네, 좋습니다! 👍',
          '알겠습니다~',
          '확인했어요!',
          '좋은 생각이네요 😊',
          '동의합니다!'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: friend.id,
          text: randomResponse,
          time: timeString
        }]);
      }, 1000 + Math.random() * 2000);
    }
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#B2C7D9'
    }}>
      {/* 채팅 헤더 */}
      <div style={{
        padding: '15px 20px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '25px',
          marginRight: '12px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '50%'
        }}>
          {friend.avatar}
        </div>
        <div>
          <p style={{ fontWeight: 'bold', color: '#333' }}>{friend.name}</p>
          <p style={{ fontSize: '12px', color: '#999' }}>{friend.status}</p>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === user.id ? 'flex-end' : 'flex-start',
              marginBottom: '15px'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '10px 15px',
              borderRadius: '18px',
              backgroundColor: msg.sender === user.id ? '#FEE500' : 'white',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <p style={{ color: '#333', wordBreak: 'break-word' }}>{msg.text}</p>
              <p style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div style={{
        padding: '15px',
        backgroundColor: 'white',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="메시지를 입력하세요..."
          style={{
            flex: 1,
            padding: '12px 20px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            outline: 'none',
            fontSize: '15px'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '12px 25px',
            backgroundColor: '#FEE500',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#3C1E1E',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FDD835'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
        >
          전송
        </button>
      </div>
    </div>
  );
}
