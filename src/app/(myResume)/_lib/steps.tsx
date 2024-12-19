export const steps: any = [
  {
    tour: "tour1",
    steps: [
      {
        icon: <>👋</>,
        title: "공개 여부 설정",
        content: (
          <>공개 여부에 체크하시면 커뮤니티에 회원님의 이력서가 공개됩니다!</>
        ),
        selector: "#tour1-step1",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 11,
      },
      {
        icon: <>🪄</>,
        title: "이력서 수정",
        content: (
          <>
            이력서 내용 중에 수정을 원하는 부분을 드래그하여 AI에게 수정 요청을
            보낼 수 있습니다!
          </>
        ),
        selector: "#tour1-step2",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 11,
      },
      {
        icon: <>🎉</>,
        title: "댓글",
        content: <>회원님의 이력서에 남긴 다른 사용자들의 댓글을 확인하세요!</>,
        selector: "#tour1-step3",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 11,
      },
    ],
  },
  {
    tour: "tour2",
    steps: [
      {
        icon: <>🌟</>,
        title: "Welcome to Tour 2!",
        content: <>This is step 1 of Tour 2</>,
        selector: "#tour2-step1",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 11,
      },
      {
        icon: <>🔥</>,
        title: "Feel the heat!",
        content: <>This is step 2 of Tour 2</>,
        selector: "#tour2-step2",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 999,
      },
      {
        icon: <>🎈</>,
        title: "Party time!",
        content: <>This is step 3 of Tour 2</>,
        selector: "#tour2-step3",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 11,
        nextRoute: "/page-two",
      },
      {
        icon: <>🎉</>,
        title: "Celebrate!",
        content: <>This is step 4 of Tour 2</>,
        selector: "#tour2-step4",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 11,
        prevRoute: "/",
      },
    ],
  },
];
