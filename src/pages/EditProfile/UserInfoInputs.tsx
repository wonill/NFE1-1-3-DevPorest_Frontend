import React, { useState, useEffect } from "react";
import InfoInput from "./InfoInput";
import email from "../../assets/email.svg";
import mobile from "../../assets/mobile.svg";
import blog from "../../assets/blog.svg";
import gitHub from "../../assets/github.svg";
import instagram from "../../assets/instagram.svg";
import { validateInput } from "../../utils/validInput";

interface UserInfoInputsProps {
  onChange: (data: {
    email: string;
    mobile: string;
    github: string;
    instagram: string;
    blog: string;
  }) => void;
}

const UserInfoInputs: React.FC<UserInfoInputsProps> = ({ onChange }) => {
  const [emailValue, setEmailValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");
  const [githubValue, setGithubValue] = useState("");
  const [instagramValue, setInstagramValue] = useState("");
  const [blogValue, setBlogValue] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    mobile: false,
    github: false,
    instagram: false,
    blog: false,
  });

  useEffect(() => {
    const newErrors = {
      email: validateInput("email", emailValue) ? false : true,
      mobile: validateInput("mobile", mobileValue) ? false : true,
      github: validateInput("github", githubValue) ? false : true,
      instagram: validateInput("url", instagramValue) ? false : true,
      blog: validateInput("url", blogValue) ? false : true,
    };

    setErrors(newErrors);

    onChange({
      email: emailValue,
      mobile: mobileValue,
      github: githubValue,
      instagram: instagramValue,
      blog: blogValue,
    });
  }, [emailValue, mobileValue, githubValue, instagramValue, blogValue, onChange]);

  return (
    <>
      <p>홍길동</p>
      <InfoInput
        icon={email}
        placeholder="이메일을 입력해주세요."
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
        error={errors.email}
      />

      <InfoInput
        icon={mobile}
        placeholder="010-XXXX-XXXX의 형식을 지켜주세요"
        value={mobileValue}
        onChange={e => setMobileValue(e.target.value)}
        error={errors.mobile}
      />

      <InfoInput
        icon={gitHub}
        placeholder="GitHub 링크를 입력해주세요."
        value={githubValue}
        onChange={e => setGithubValue(e.target.value)}
        error={errors.github}
      />

      <InfoInput
        icon={instagram}
        placeholder="Instagram 링크를 입력해주세요."
        value={instagramValue}
        onChange={e => setInstagramValue(e.target.value)}
      />

      <InfoInput
        icon={blog}
        placeholder="Blog 링크를 입력해주세요."
        value={blogValue}
        onChange={e => setBlogValue(e.target.value)}
      />
    </>
  );
};

export default UserInfoInputs;
