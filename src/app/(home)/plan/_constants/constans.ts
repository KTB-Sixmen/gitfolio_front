export const PLANS = [
  {
    title: "Free",
    price: "0",
    description: "이력서 생성 기능을 사용해 보세요!",
    buttonLabel: "나의 현재 플랜",
    buttonDisabled: true,
    benefits: ["이력서 생성+수정 3회", "이력서 PDF 다운로드"],
    animationDelay: "0.2s",
  },
  {
    title: "Pro",
    price: "19,900",
    description: "모든 기능을 무제한으로 사용하세요!",
    buttonLabel: "Pro로 업그레이드",
    buttonDisabled: false,
    benefits: [
      "이력서 생성 무제한",
      "이력서 수정 무제한",
      "PDF 다운로드",
      "맞춤형 템플릿 사용",
    ],
    animationDelay: "0.2s",
  },
];

export const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "무료 사용자는 하루에 몇 번 이력서 생성 및 수정을 할 수 있나요?",
    answer: `
      무료 사용자는 하루에 3회의 이용권이 주어지며, 이 이용권은 생성과 수정을 합쳐서 
      총 3회까지 사용할 수 있습니다. 하루가 지나면 이용권이 새롭게 갱신됩니다.
    `,
  },
  {
    id: "item-2",
    question: "이력서를 생성하면 어디에 저장되나요?",
    answer: `
      생성된 이력서는 깃트폴리오 데이터베이스에 안전하게 저장됩니다. 저장된 이력서는 
      사용자가 공개 여부를 설정하여 커뮤니티에 공개하거나 '나만 보기'로 선택할 수 있습니다.
    `,
  },
  {
    id: "item-3",
    question: "정기결제는 어떻게 이루어지나요?",
    answer: `
      깃트폴리오의 유료 구독 서비스는 한 달 단위로 정기결제가 이루어집니다. 
      구독 기간 동안 무제한으로 이력서 생성 및 수정이 가능합니다.
    `,
  },
  {
    id: "item-4",
    question: "내 계정이 정기결제 상태인지 확인하려면 어떻게 해야 하나요?",
    answer: `
      화면 상단의 프로필 사진을 클릭하면 나오는 팝업에서 확인할 수 있습니다. 
      정기결제 상태라면 프로필 사진 위에 왕관 아이콘이 표시됩니다.
    `,
  },
];
