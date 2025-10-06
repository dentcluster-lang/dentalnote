export default function Home() {
  return (
    <main style={{ backgroundColor: '#ffeb3b', minHeight: '100vh', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🦷 Dental Cluster</h1>
        <p style={{ fontSize: '20px', color: '#666' }}>노란색 배경이 적용되었습니다!</p>
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
          <p>배경색 테스트 영역</p>
          <ul>
            <li>전체 배경: 노란색 (#ffeb3b)</li>
            <li>콘텐츠 카드: 흰색</li>
            <li>강조 영역: 연한 노란색</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
