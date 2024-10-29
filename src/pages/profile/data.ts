// 유저의 포트폴리오 카드에 담을 더미데이터
interface PortfolioData {
  portfolio_id: number;
  title: string;
  thumbnailImg: string;
  profileImg: string;
  userName: string;
  views: number;
  likes: number;
}

export const DummyData: PortfolioData[] = [
  {
    portfolio_id: Math.random(),
    title: "LIVELY CLUB Character Branding 라이블리클럽(LVCL)",
    thumbnailImg:
      "https://cdn-bastani.stunning.kr/prod/portfolios/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/contents/Pme8VukMguLu5oRr.main.png",
    profileImg:
      "https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300",
    userName:
      "유애나이 YUNAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    views: 15,
    likes: 3,
  },
  {
    portfolio_id: Math.random(),
    title: "LIVELY CLUB Character Branding 라이블리클럽(LVCL)",
    thumbnailImg: "",
    profileImg:
      "https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300",
    userName: "홍길동",
    views: 15,
    likes: 3,
  },
  {
    portfolio_id: Math.random(),
    title: "LIVELY CLUB Character Branding 라이블리클럽(LVCL)",
    thumbnailImg:
      "https://cdn-bastani.stunning.kr/prod/portfolios/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/contents/Pme8VukMguLu5oRr.main.png",
    profileImg:
      "https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300",
    userName: "홍길동",
    views: 15,
    likes: 3,
  },
  {
    portfolio_id: Math.random(),
    title: "LIVELY CLUB Character Branding 라이블리클럽(LVCL)",
    thumbnailImg:
      "https://cdn-bastani.stunning.kr/prod/portfolios/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/contents/Pme8VukMguLu5oRr.main.png",
    profileImg:
      "https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300",
    userName: "홍길동",
    views: 15,
    likes: 3,
  },
  {
    portfolio_id: Math.random(),
    title: "LIVELY CLUB Character Branding 라이블리클럽(LVCL)",
    thumbnailImg:
      "https://cdn-bastani.stunning.kr/prod/portfolios/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/contents/Pme8VukMguLu5oRr.main.png",
    profileImg:
      "https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300",
    userName: "홍길동",
    views: 15,
    likes: 3,
  },
  {
    portfolio_id: Math.random(),
    title: "LIVELY CLUB Character Branding 라이블리클럽(LVCL)",
    thumbnailImg:
      "https://cdn-bastani.stunning.kr/prod/portfolios/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/contents/Pme8VukMguLu5oRr.main.png",
    profileImg:
      "https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300",
    userName: "홍길동",
    views: 15,
    likes: 3,
  },
];

// 유저의 기술스택을 보여주는 더미데이터
export interface TechStackType {
  name: string;
  backgroundColor: string;
  color: string;
  onClick: () => void;
}

export const dummyTechStacks: Array<TechStackType> = [
  {
    name: "React",
    backgroundColor: "#61dafb",
    color: "#282c34",
    onClick: () => console.log("React clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "React",
    backgroundColor: "#61dafb",
    color: "#282c34",
    onClick: () => console.log("React clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
];
