'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      name: 'DentalAI 상담사',
      text: '안녕하세요! DentalAI 고객 상담 센터입니다.',
      time: '오전 10:00',
      type: 'system'
    },
    {
      id: 2,
      sender: 'bot',
      name: 'DentalAI 상담사',
      text: '무엇을 도와드릴까요? 제품 문의, 주문, 배송 등 궁금하신 점을 말씀해주세요.',
      time: '오전 10:00',
      type: 'system'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies] = useState([
    '제품 문의',
    '주문 방법',
    '배송 조회',
    '반품/교환',
    '가격 문의'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('general');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      name: user?.name || '고객',
      text: message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      type: 'user'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);

    // AI 자동 응답 시뮬레이션
    setTimeout(() => {
      const responses = {
        '제품 문의': '어떤 제품에 대해 알고 싶으신가요? 임플란트, 치과재료, 장비 등 다양한 제품을 보유하고 있습니다.',
        '주문 방법': '회원가입 후 원하시는 제품을 장바구니에 담아 주문하실 수 있습니다. 자세한 안내가 필요하신가요?',
        '배송 조회': '주문번호를 알려주시면 배송 상태를 확인해드리겠습니다.',
        '반품/교환': '제품 수령 후 7일 이내 미개봉 제품에 한해 반품/교환이 가능합니다.',
        '가격 문의': '어떤 제품의 가격을 알고 싶으신가요? 제품명을 알려주세요.'
      };

      let responseText = '문의 감사합니다. ';
      
      if (message.includes('임플란트')) {
        responseText = 'Straumann, Osstem 등 다양한 임플란트 시스템을 보유하고 있습니다. 특별 할인 행사도 진행 중입니다.';
      } else if (message.includes('가격') || message.includes('얼마')) {
        responseText = '정확한 가격 정보는 제품 페이지에서 확인하실 수 있습니다. 대량 구매 시 추가 할인도 가능합니다.';
      } else if (message.includes('배송')) {
        responseText = '일반적으로 주문 후 1-2일 내 배송됩니다. 서울/경기 지역은 당일 배송도 가능합니다.';
      } else {
        responseText += '더 자세한 상담을 원하시면 실시간 상담사 연결을 요청해주세요.';
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        name: 'DentalAI 상담사',
        text: responseText,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        type: 'system'
      }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
  };

  const categories = [
    { id: 'general', name: '일반 문의', icon: '💬' },
    { id: 'product', name: '제품 상담', icon: '🦷' },
    { id: 'order', name: '주문/배송', icon: '📦' },
    { id: 'technical', name: '기술 지원', icon: '🔧' },
    { id: 'urgent', name: '긴급 문의', icon: '🚨' }
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px 24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => router.push('/')}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ← 홈으로
              </button>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                  실시간 상담 센터
                </h1>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>
                  평일 09:00-18:00 | 주말/공휴일 10:00-16:00
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ fontSize: '14px' }}>상담 가능</span>
            </div>
          </div>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* 사이드바 */}
        <aside style={{ 
          width: '280px',
          backgroundColor: 'white',
          borderRight: '1px solid #e9ecef',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
            상담 카테고리
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '10px',
                  background: selectedCategory === cat.id ? 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa',
                  color: selectedCategory === cat.id ? 'white' : '#495057',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#fff3e0',
            borderRadius: '12px'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              전화 상담
            </h4>
            <p style={{ fontSize: '20px', fontWeight: '700', color: '#f57c00', marginBottom: '8px' }}>
              1588-0000
            </p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              복잡한 문의는 전화 상담을 이용해주세요
            </p>
          </div>
        </aside>

        {/* 채팅 영역 */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
          {/* 채팅 메시지 영역 */}
          <div style={{ 
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '20px'
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  maxWidth: '70%',
                  alignItems: 'flex-start'
                }}>
                  {msg.sender !== 'user' && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      AI
                    </div>
                  )}
                  
                  <div style={{ flex: 1 }}>
                    {msg.sender !== 'user' && (
                      <p style={{ fontSize: '12px', color: '#868e96', marginBottom: '4px' }}>
                        {msg.name}
                      </p>
                    )}
                    <div
                      style={{
                        padding: '14px 18px',
                        borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        backgroundColor: msg.sender === 'user' ? 
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f3f5',
                        background: msg.sender === 'user' ? 
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f3f5',
                        color: msg.sender === 'user' ? 'white' : '#212529',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        wordBreak: 'break-word'
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>
                        {msg.text}
                      </p>
                    </div>
                    <p style={{ 
                      fontSize: '11px', 
                      color: '#adb5bd', 
                      marginTop: '4px',
                      textAlign: msg.sender === 'user' ? 'right' : 'left'
                    }}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: 'white'
                }}>
                  AI
                </div>
                <div style={{
                  padding: '14px 18px',
                  backgroundColor: '#f1f3f5',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <div style={dotStyle} />
                  <div style={{...dotStyle, animationDelay: '0.2s'}} />
                  <div style={{...dotStyle, animationDelay: '0.4s'}} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 답변 */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #e9ecef',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto'
          }}>
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  color: '#495057',
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.color = '#667eea';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#dee2e6';
                  e.currentTarget.style.color = '#495057';
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* 입력 영역 */}
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #e9ecef',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid #dee2e6',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}
              >
                📎
              </button>
              
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="메시지를 입력하세요..."
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  border: '2px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
              
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                style={{
                  padding: '12px 28px',
                  background: message.trim() ? 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e9ecef',
                  color: message.trim() ? 'white' : '#adb5bd',
                  border: 'none',
                  borderRadius: '25px',
                  fontWeight: '600',
                  cursor: message.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s'
                }}
              >
                전송
              </button>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

const dotStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#868e96',
  animation: 'bounce 1.4s infinite'
};
