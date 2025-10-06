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
    marketingAgreed: false
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
    // 회원가입 처리
    alert('회원가입이 완료되었습니다!');
    router.push('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          회원가입
        </h2>

        {/* 진행 상태 표시 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          {['기본정보', '사업자정보', '주소/결제', '약관동의'].map((label, idx) => (
            <div key={idx} style={{
              flex: 1,
              textAlign: 'center',
              padding: '10px',
              backgroundColor: step > idx ? '#4CAF50' : '#e0e0e0',
              color: step > idx ? 'white' : '#666',
              borderRadius: '5px',
              margin: '0 5px',
              fontSize: '14px',
              fontWeight: step === idx + 1 ? 'bold' : 'normal'
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* Step 1: 기본 정보 */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>이메일 *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>비밀번호 *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>비밀번호 확인 *</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>이름 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>연락처 *</label>
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
        )}

        {/* Step 2: 사업자 정보 */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>병원/회사명 *</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>사업자등록번호 *</label>
              <input
                type="text"
                value={formData.businessNumber}
                onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
                style={inputStyle}
                placeholder="123-45-67890"
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>사업자등록증 첨부 *</label>
              <div style={{
                border: '2px dashed #ddd',
                borderRadius: '5px',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#fafafa'
              }}>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="business-file"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="business-file" style={{ cursor: 'pointer' }}>
                  📎 파일 선택
                  {formData.businessFile && (
                    <p style={{ marginTop: '10px', color: '#4CAF50' }}>
                      {formData.businessFile.name}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 주소 및 결제 정보 */}
        {step === 3 && (
          <div>
            <h4 style={{ marginBottom: '20px' }}>배송 주소</h4>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>우편번호 *</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  style={{...inputStyle, flex: 1}}
                  required
                />
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  주소 검색
                </button>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>주소 *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={labelStyle}>상세주소</label>
              <input
                type="text"
                value={formData.addressDetail}
                onChange={(e) => setFormData({...formData, addressDetail: e.target.value})}
                style={inputStyle}
              />
            </div>

            <h4 style={{ marginBottom: '20px' }}>결제 카드 등록</h4>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>카드번호 *</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                style={inputStyle}
                placeholder="1234-5678-9012-3456"
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>유효기간 *</label>
                <input
                  type="text"
                  value={formData.cardExpiry}
                  onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})}
                  style={inputStyle}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>CVC *</label>
                <input
                  type="text"
                  value={formData.cardCVC}
                  onChange={(e) => setFormData({...formData, cardCVC: e.target.value})}
                  style={inputStyle}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 약관 동의 */}
        {step === 4 && (
          <div>
            <div style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              marginBottom: '20px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.termsAgreed}
                  onChange={(e) => setFormData({...formData, termsAgreed: e.target.checked})}
                  style={{ marginRight: '10px' }}
                />
                <span>[필수] 이용약관 동의</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.privacyAgreed}
                  onChange={(e) => setFormData({...formData, privacyAgreed: e.target.checked})}
                  style={{ marginRight: '10px' }}
                />
                <span>[필수] 개인정보 수집 및 이용 동의</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.marketingAgreed}
                  onChange={(e) => setFormData({...formData, marketingAgreed: e.target.checked})}
                  style={{ marginRight: '10px' }}
                />
                <span>[선택] 마케팅 정보 수신 동의</span>
              </label>
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          {step > 1 && (
            <button
              onClick={handlePrev}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#e0e0e0',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              이전
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={handleNext}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              다음
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#ffeb3b',
                color: '#333',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              disabled={!formData.termsAgreed || !formData.privacyAgreed}
            >
              가입 완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
  color: '#555',
  fontSize: '14px',
  fontWeight: 'bold'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px'
};
