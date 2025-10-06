'use client';
import { useState, useEffect } from 'react';
import ChatLogin from '@/components/ChatLogin';
import ChatRoom from '@/components/ChatRoom';
import FriendsList from '@/components/FriendsList';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [selectedFriend, setSelectedFriend] = useState<any>(null);

  return (
    <div style={{ 
      backgroundColor: '#ffeb3b', 
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {!user ? (
        <ChatLogin onLogin={setUser} />
      ) : (
        <div style={{ display: 'flex', height: '100vh' }}>
          <FriendsList 
            user={user} 
            onSelectFriend={setSelectedFriend}
            selectedFriend={selectedFriend}
          />
          {selectedFriend ? (
            <ChatRoom user={user} friend={selectedFriend} />
          ) : (
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'white'
            }}>
              <p style={{ color: '#999' }}>친구를 선택하여 대화를 시작하세요</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
