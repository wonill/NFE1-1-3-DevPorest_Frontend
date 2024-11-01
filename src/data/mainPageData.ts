import { ITechStackType } from "../types/api-types/TechStackType";

// 메인페이지 최상단 인기 포트폴리오 데이터
interface PopularPortfolioType {
  id: string;
  image: string;
  title: string;
  name: string;
  job: string;
}

export const popularPortfolioData: PopularPortfolioType[] = [
  {
    id: "1",
    image:
      "https://images.pexels.com/photos/1309661/pexels-photo-1309661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600",
    title: "코드로 그린 나의 이야기",
    name: "홍길동",
    job: "Frontend Developer",
  },
  {
    id: "2",
    image:
      "https://images.pexels.com/photos/1586070/pexels-photo-1586070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600",
    title: "나도 서일페 인기 부스 되고 싶어!",
    name: "홍길동",
    job: "Backend Developer",
  },
  {
    id: "3",
    image:
      "https://images.pexels.com/photos/1761278/pexels-photo-1761278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600",
    title: "브랜드 창업, 패키지 제작 모두 원한다면",
    name: "홍길동",
    job: "Frontend Developer",
  },
];

// 포트폴리오 카드 리스트에 담을 더미데이터
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

export const dummyTechStacks: Array<ITechStackType> = [
  {
    skill: "React",
    bgColor: "#61dafb",
    textColor: "#282c34",
    jobCode: "frontend", // 임시
  },
  {
    skill: "TypeScript",
    bgColor: "#007acc",
    textColor: "#ffffff",
    jobCode: "frontend", // 임시
  },
  {
    skill: "React",
    bgColor: "#61dafb",
    textColor: "#282c34",
    jobCode: "frontend", // 임시
  },
  {
    skill: "TypeScript",
    bgColor: "#007acc",
    textColor: "#ffffff",
    jobCode: "frontend", // 임시
  },
];

// 인기 개발자 프로필 더미데이터
export const dummyDevProfiles = [
  {
    profileImage: "https://avatars.githubusercontent.com/u/9919?v=4", // 프로필 이미지 URL
    name: "홍길동",
    category: "Frontend Developer",
    intro:
      "안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다. 안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다.",
    techStacks: dummyTechStacks,
    onClick: () => console.log("profile clicked"),
  },
  {
    profileImage: "https://avatars.githubusercontent.com/u/9919?v=4", // 프로필 이미지 URL
    name: "홍길동",
    category: "Frontend Developer",
    intro:
      "안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다. 안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다.",
    techStacks: dummyTechStacks,
    onClick: () => console.log("profile clicked"),
  },
  {
    profileImage: "https://avatars.githubusercontent.com/u/9919?v=4", // 프로필 이미지 URL
    name: "홍길동",
    category: "Frontend Developer",
    intro:
      "안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다. 안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다.",
    techStacks: dummyTechStacks,
    onClick: () => console.log("profile clicked"),
  },
  {
    profileImage: "https://avatars.githubusercontent.com/u/9919?v=4", // 프로필 이미지 URL
    name: "홍길동",
    category: "Frontend Developer",
    intro:
      "안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다. 안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다.",
    techStacks: dummyTechStacks,
    onClick: () => console.log("profile clicked"),
  },
  {
    profileImage: "https://avatars.githubusercontent.com/u/9919?v=4", // 프로필 이미지 URL
    name: "홍길동",
    category: "Frontend Developer",
    intro:
      "안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다. 안녕하세요! 저는 웹 개발을 사랑하는 개발자입니다.",
    techStacks: dummyTechStacks,
    onClick: () => console.log("profile clicked"),
  },
];

interface GraphDataType {
  id: string;
  value: number;
  color: string;
}

export const graphData: GraphDataType[] = [
  { id: "react", value: 40, color: "#61dafb" },
  { id: "vue", value: 25, color: "#42b883" },
  { id: "angular", value: 20, color: "#dd1b16" },
  { id: "html", value: 10, color: "#e34c26" },
  { id: "css", value: 5, color: "#1572b6" },
  { id: "js", value: 30, color: "#f7df1e" },
  { id: "sass", value: 15, color: "#cc6699" },
];
