#!/bin/bash

# 색상 설정
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🦷 DentalAI Shop - 배포 스크립트${NC}"
echo ""

# 커밋 메시지 입력
echo -e "${YELLOW}📝 커밋 메시지를 입력하세요:${NC}"
read commit_msg

# Git 작업
echo -e "${YELLOW}📦 GitHub에 푸시 중...${NC}"
git add -A
git commit -m "$commit_msg"
git push origin main

# 완료 메시지
echo ""
echo -e "${GREEN}✅ GitHub 푸시 완료!${NC}"
echo -e "${YELLOW}⏳ GitHub Actions가 자동으로 배포를 시작합니다 (2-3분 소요)${NC}"
echo ""
echo -e "${BLUE}📊 배포 진행 상황:${NC}"
echo "   https://github.com/dentcluster-lang/dentalnote/actions"
echo ""
echo -e "${BLUE}🌐 배포될 사이트:${NC}"
echo "   https://dental-cluster-new.web.app"
echo ""

# Actions 페이지 열기
open https://github.com/dentcluster-lang/dentalnote/actions
