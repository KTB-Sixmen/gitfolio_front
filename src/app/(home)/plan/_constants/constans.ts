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
    question: "사용권을 매일 소생해 주는 이벤트는 무엇인가요?",
    answer:
      "사용권을 모두 소진하신 경우 익일 오전 중에 3건을 무료로 제공합니다.",
  },
  {
    id: "item-2",
    question: "구매한 사용권의 환불기준",
    answer: `
      구매한 사용권을 전혀 사용하지 않은 경우에 한해 구매일로부터 7일 이내에
      고객센터로 환불 의사를 전달하면 100% 환불이 진행됩니다. 단, 사용권을 일부
      사용하거나 환불 기한이 지난 경우 잔여 사용권이 있더라도 부분 환불은 불가능합니다.
    `,
  },
  {
    id: "item-3",
    question: "구매한 사용권은 언제까지 사용이 가능한가요?",
    answer: `
      사용권별로 명시된 유효기간(구매일 포함한 달력일 기준)까지 사용이 가능하며, 
      이 날짜가 지난 이후에는 사용권이 남아 있더라도 사용이 불가능합니다.
    `,
  },
  {
    id: "item-4",
    question: "사용권은 어디에 사용할 수 있나요?",
    answer: `
      컨텐츠 이용 중 사용권 안내 메시지가 나올 경우 해당 사용권 만큼 차감됩니다. 
      대표적으로 자기소개서 생성 시 사용되는 사용권은 1개입니다.
    `,
  },
];
