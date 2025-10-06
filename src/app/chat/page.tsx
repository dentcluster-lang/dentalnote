'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, 
        { id: messages.length + 1, sender: 'user', text: input }
      ]);
      
      // 자동 응답 (나중에 AI 연동)
      setTimeout(() => {
        setMessages(prev => [...prev,
          { id: prev.length + 1, sender: 'bot', text: '문의 감사합니다. 곧 답변드리겠습니다.' }
        ]);
      }, 1000);
      
      setInput('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        backgroundColor: '#4CAF50', 
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>💬 실시간 상담</h2>
        <button onClick={() => router.push('/')} style={{
          padding: '8px 16px',
          backgroundColor: 'white',
          color: '#4CAF50',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          홈으로
        </button>
      </header>

      <div style={{ 
        flex: 1, 
        padding: '20px',
        overflowY: 'auto',
        backgroundColor: '#f5f5f5'
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '10px'
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '10px 15px',
              borderRadius: '10px',
              backgroundColor: msg.sender === 'user' ? '#4CAF50' : 'white',
              color: msg.sender === 'user' ? 'white' : 'black'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        padding: '20px',
        backgroundColor: 'white',
        borderTop: '1px solid #ddd',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="메시지를 입력하세요..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}
        />
        <button onClick={sendMessage} style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          전송
        </button>
      </div>
    </div>
  );
}
