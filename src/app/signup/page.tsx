'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // 기본 정보
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    
    // 사업자 정보
    businessName: '',
    businessNumber: '',
    businessFile: null as File | null,
    
    // 주소
    address: '',
    addressDetail: '',
    zipCode: '',
    
    // 결제 정보
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
    
    // 약관 동의
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
    allAgreed: false
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, businessFile: e.target.files[0]});
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert('회원가입이 완료되었습니다!');
    router.push('/login');
  };

  const handleAllAgree = (checked: boolean) => {
    setFormData({
      ...formData,
      allAgreed: checked,
      termsAgreed: checked,
      privacyAgreed: checked,
      marketingAgreed: checked
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      {/* 헤더 */}
      <header style={{ 
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} 
               onClick={() => router.push('/')}>
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
                fontSize: '20px', 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                DentalAI
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div style={{ padding: '60px 20px' }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {/* 타이틀 */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px'
            }}>
              회원가입
            </h2>
            <p style={{ color: '#868e96', fontSize: '16px' }}>
              DentalAI의 프리미엄 서비스를 경험해보세요
            </p>
          </div>

          {/* 진행 상태 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '40px',
            position: 'relative'
          }}>
            {/* 진행 바 배경 */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '60px',
              right: '60px',
              height: '2px',
              backgroundColor: '#e9ecef',
              zIndex: 0
            }} />
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '60px',
              width: `${(step - 1) * 33}%`,
              height: '2px',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              transition: 'width 0.3s ease',
              zIndex: 0
            }} />

            {[
              { num: 1, label: '기본정보', icon: '👤' },
              { num: 2, label: '사업자정보', icon: '🏢' },
              { num: 3, label: '주소/결제', icon: '💳' },
              { num: 4, label: '약관동의', icon: '✅' }
            ].map((item) => (
              <div key={item.num} style={{
                flex: 1,
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  margin: '0 auto 8px',
                  borderRadius: '50%',
                  background: step >= item.num ? 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                    'white',
                  border: step >= item.num ? 'none' : '2px solid #e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  transition: 'all 0.3s'
                }}>
                  {step > item.num ? '✓' : item.icon}
                </div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: step === item.num ? '600' : '400',
                  color: step >= item.num ? '#667eea' : '#868e96'
                }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* 폼 컨테이너 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            {/* Step 1: 기본 정보 */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                  기본 정보를 입력해주세요
                </h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>이메일</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={inputStyle}
                    placeholder="example@dental.com"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>비밀번호</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      style={inputStyle}
                      placeholder="8자 이상 입력"
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>비밀번호 확인</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      style={inputStyle}
                      placeholder="비밀번호 재입력"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>이름</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={inputStyle}
                      placeholder="실명 입력"
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>연락처</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={inputStyle}
                      placeholder="010-1234-5678"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 사업자 정보 */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                  사업자 정보를 입력해주세요
                </h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>병원/회사명</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    style={inputStyle}
                    placeholder="예: 행복한치과의원"
                    required
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>사업자등록번호</label>
                  <input
                    type="text"
                    value={formData.businessNumber}
                    onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
                    style={inputStyle}
                    placeholder="123-45-67890"
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>사업자등록증 첨부</label>
                  <label style={{
                    display: 'block',
                    padding: '40px',
                    border: '2px dashed #dee2e6',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#f8f9fa',
                    transition: 'all 0.3s'
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.backgroundColor = '#f3f0ff';
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.style.borderColor = '#dee2e6';
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📎</div>
                    {formData.businessFile ? (
                      <p style={{ color: '#667eea', fontWeight: '600' }}>
                        ✅ {formData.businessFile.name}
                      </p>
                    ) : (
                      <>
                        <p style={{ fontSize: '16px', color: '#495057', fontWeight: '600' }}>
                          파일을 선택하거나 드래그하세요
                        </p>
                        <p style={{ fontSize: '14px', color: '#868e96', marginTop: '8px' }}>
                          PDF, JPG, PNG (최대 10MB)
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: 주소 및 결제 정보 */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                  배송지 및 결제 정보
                </h3>
                
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#495057' }}>
                    배송 주소
                  </h4>
                  
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                      style={{...inputStyle, flex: 1}}
                      placeholder="우편번호"
                      required
                    />
                    <button style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      주소 검색
                    </button>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      style={inputStyle}
                      placeholder="기본 주소"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.addressDetail}
                      onChange={(e) => setFormData({...formData, addressDetail: e.target.value})}
                      style={inputStyle}
                      placeholder="상세 주소"
                    />
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#495057' }}>
                    결제 카드 등록
                  </h4>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                      style={inputStyle}
                      placeholder="카드번호 (1234-5678-9012-3456)"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '12px' }}>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})}
                      style={inputStyle}
                      placeholder="MM/YY"
                      required
                    />
                    <input
                      type="text"
                      value={formData.cardCVC}
                      onChange={(e) => setFormData({...formData, cardCVC: e.target.value})}
                      style={inputStyle}
                      placeholder="CVC"
                      required
                    />
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                      style={inputStyle}
                      placeholder="카드 소유자명"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 약관 동의 */}
            {step === 4 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                  이용약관에 동의해주세요
                </h3>
                
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '12px',
                    backgroundColor: formData.allAgreed ? '#f3f0ff' : 'white',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    border: formData.allAgreed ? '2px solid #667eea' : '2px solid transparent',
                    transition: 'all 0.3s'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.allAgreed}
                      onChange={(e) => handleAllAgree(e.target.checked)}
                      style={{ marginRight: '12px', width: '20px', height: '20px' }}
                    />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>
                      전체 동의
                    </span>
                  </label>

                  <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '16px' }}>
                    <label style={checkboxLabelStyle}>
                      <input
                        type="checkbox"
                        checked={formData.termsAgreed}
                        onChange={(e) => setFormData({...formData, termsAgreed: e.target.checked})}
                        style={{ marginRight: '10px' }}
                      />
                      <span>[필수] 이용약관 동의</span>
                      <a href="#" style={{ color: '#667eea', marginLeft: 'auto' }}>보기</a>
                    </label>

                    <label style={checkboxLabelStyle}>
                      <input
                        type="checkbox"
                        checked={formData.privacyAgreed}
                        onChange={(e) => setFormData({...formData, privacyAgreed: e.target.checked})}
                        style={{ marginRight: '10px' }}
                      />
                      <span>[필수] 개인정보 수집 및 이용 동의</span>
                      <a href="#" style={{ color: '#667eea', marginLeft: 'auto' }}>보기</a>
                    </label>

                    <label style={checkboxLabelStyle}>
                      <input
                        type="checkbox"
                        checked={formData.marketingAgreed}
                        onChange={(e) => setFormData({...formData, marketingAgreed: e.target.checked})}
                        style={{ marginRight: '10px' }}
                      />
                      <span>[선택] 마케팅 정보 수신 동의</span>
                      <a href="#" style={{ color: '#667eea', marginLeft: 'auto' }}>보기</a>
                    </label>
                  </div>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: '#fff3e0',
                  borderRadius: '12px'
                }}>
                  <p style={{ fontSize: '14px', color: '#f57c00' }}>
                    📌 회원가입 완료 시 <strong>1,000 포인트</strong>가 지급됩니다!
                  </p>
                </div>
              </div>
            )}

            {/* 버튼 */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
              {step > 1 && (
                <button
                  onClick={handlePrev}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: 'white',
                    color: '#495057',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.color = '#667eea';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e9ecef';
                    e.currentTarget.style.color = '#495057';
                  }}
                >
                  이전
                </button>
              )}
              
              {step < 4 ? (
                <button
                  onClick={handleNext}
                  style={{
                    flex: 2,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  다음
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 2,
                    padding: '14px',
                    background: formData.termsAgreed && formData.privacyAgreed ?
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e9ecef',
                    color: formData.termsAgreed && formData.privacyAgreed ? 'white' : '#868e96',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: formData.termsAgreed && formData.privacyAgreed ? 'pointer' : 'not-allowed',
                    boxShadow: formData.termsAgreed && formData.privacyAgreed ? 
                      '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none',
                    transition: 'all 0.3s'
                  }}
                  disabled={!formData.termsAgreed || !formData.privacyAgreed}
                >
                  가입 완료
                </button>
              )}
            </div>
          </div>

          {/* 하단 링크 */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ color: '#868e96' }}>
              이미 계정이 있으신가요?{' '}
              <a 
                onClick={() => router.push('/login')}
                style={{ 
                  color: '#667eea', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                로그인
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#495057'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #e9ecef',
  borderRadius: '8px',
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.3s',
  backgroundColor: 'white'
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  marginBottom: '8px',
  cursor: 'pointer',
  borderRadius: '6px',
  transition: 'background-color 0.2s'
};
