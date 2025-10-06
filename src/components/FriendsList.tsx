'use client';
import { useState } from 'react';

export default function FriendsList({ user, onSelectFriend, selectedFriend }: any) {
  const [friends] = useState([
    { id: 'kim123', name: '김철수', avatar: '👨‍⚕️', status: '온라인', lastMessage: '안녕하세요!' },
    { id: 'lee456', name: '이영희', avatar: '👩‍⚕️', status: '자리비움', lastMessage: '회의 중입니다' },
    { id: 'park789', name: '박민수', avatar: '🦷', status: '오프라인', lastMessage: '내일 봐요' },
    { id: 'choi321', name: '최지훈', avatar: '😷', status: '온라인', lastMessage: '환자 진료 끝났어요' },
    { id: 'jung654', name: '정수진', avatar: '💉', status: '온라인', lastMessage: '점심 같이 드실래요?' },
  ]);

  const filteredFriends = friends.filter(f => f.id !== user.id);

  return (
    <div style={{
      width: '350px',
      backgroundColor: 'white',
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 헤더 */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#FEE500'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3C1E1E' }}>친구</h2>
          <span style={{ backgroundColor: '#3C1E1E', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
            {filteredFriends.length}
          </span>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#FDD835',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            marginRight: '10px'
          }}>
            {user.name[0]}
          </div>
          <div>
            <p style={{ fontWeight: 'bold', color: '#3C1E1E' }}>{user.name}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>@{user.id}</p>
          </div>
        </div>
      </div>

      {/* 친구 목록 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filteredFriends.map(friend => (
          <div
            key={friend.id}
            onClick={() => onSelectFriend(friend)}
            style={{
              padding: '15px 20px',
              borderBottom: '1px solid #f0f0f0',
              cursor: 'pointer',
              backgroundColor: selectedFriend?.id === friend.id ? '#FFF9C4' : 'white',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (selectedFriend?.id !== friend.id) {
                e.currentTarget.style.backgroundColor = '#fafafa';
              }
            }}
            onMouseOut={(e) => {
              if (selectedFriend?.id !== friend.id) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontSize: '30px',
                marginRight: '15px',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '50%'
              }}>
                {friend.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontWeight: 'bold', color: '#333' }}>{friend.name}</p>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: friend.status === '온라인' ? '#4CAF50' : 
                                   friend.status === '자리비움' ? '#FFA726' : '#999'
                  }}></span>
                </div>
                <p style={{ fontSize: '14px', color: '#999', marginTop: '3px' }}>
                  {friend.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
