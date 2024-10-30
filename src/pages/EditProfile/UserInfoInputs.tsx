import React from "react";
import InfoInput from "./InfoInput";
import email from "../../assets/email.svg";
import mobile from "../../assets/mobile.svg";
import blog from "../../assets/blog.svg";
import gitHub from "../../assets/github.svg";
import instagram from "../../assets/instagram.svg";

const UserInfoInputs: React.FC = () => {
  return (
    <>
      <p>홍길동</p>
      <InfoInput icon={email} placeholder="이메일을 입력해주세요." />
      <InfoInput icon={mobile} placeholder="휴대폰 번호를 입력해주세요." />
      <InfoInput icon={gitHub} placeholder="GitHub 링크를 입력해주세요." />
      <InfoInput icon={instagram} placeholder="Instagram 링크를 입력해주세요." />
      <InfoInput icon={blog} placeholder="Blog 링크를 입력해주세요." />
    </>
  );
};

export default UserInfoInputs;
