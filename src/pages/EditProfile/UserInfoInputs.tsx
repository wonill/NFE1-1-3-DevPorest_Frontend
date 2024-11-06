import React, { useState, useEffect, SetStateAction } from "react";
import InfoInput from "./InfoInput";
import email from "../../assets/email.svg";
import mobile from "../../assets/mobile.svg";
import blog from "../../assets/blog.svg";
import gitHub from "../../assets/github.svg";
import instagram from "../../assets/instagram.svg";
import { validateInput } from "../../utils/valid-input";
import { UserProfileResType } from "../../types/api-types/UserType";

interface UserInfoInputsProps {
  name: string;
  userInfo: UserProfileResType;
  setUserInfo: React.Dispatch<SetStateAction<UserProfileResType>>;
}

const UserInfoInputs: React.FC<UserInfoInputsProps> = ({ name, userInfo, setUserInfo }) => {
  const [errors, setErrors] = useState({
    email: !validateInput("email", userInfo.email),
    mobile: !validateInput("mobile", userInfo.phoneNumber),
    github: !validateInput("github", userInfo.links[0]),
    instagram: !validateInput("url", userInfo.links[1]),
    blog: !validateInput("url", userInfo.links[2]),
  });

  useEffect(() => {
    const newErrors = {
      email: !validateInput("email", userInfo.email),
      mobile: !validateInput("mobile", userInfo.phoneNumber),
      github: !validateInput("github", userInfo.links[0]),
      instagram: !validateInput("url", userInfo.links[1]),
      blog: !validateInput("url", userInfo.links[2]),
    };

    setErrors(newErrors);
  }, [userInfo]);

  return (
    <>
      <p>{name}</p>
      <InfoInput
        icon={email}
        placeholder="이메일을 입력해주세요."
        value={userInfo.email}
        onChange={e =>
          setUserInfo(prev => {
            return { ...prev, email: e.target.value };
          })
        }
        error={errors.email}
      />

      <InfoInput
        icon={mobile}
        placeholder="010-XXXX-XXXX의 형식을 지켜주세요"
        value={userInfo.phoneNumber}
        onChange={e =>
          setUserInfo(prev => {
            return { ...prev, phoneNumber: e.target.value };
          })
        }
        error={errors.mobile}
      />

      <InfoInput
        icon={gitHub}
        placeholder="GitHub 링크를 입력해주세요."
        value={userInfo?.links[0] || ""}
        onChange={e =>
          setUserInfo(prev => {
            return { ...prev, links: [e.target.value, userInfo.links[1], userInfo.links[2]] };
          })
        }
        error={errors.github}
      />

      <InfoInput
        icon={instagram}
        placeholder="Instagram 링크를 입력해주세요."
        value={userInfo?.links[1] || ""}
        onChange={e =>
          setUserInfo(prev => {
            return { ...prev, links: [userInfo.links[0], e.target.value, userInfo.links[2]] };
          })
        }
      />

      <InfoInput
        icon={blog}
        placeholder="Blog 링크를 입력해주세요."
        value={userInfo?.links[2] || ""}
        onChange={e =>
          setUserInfo(prev => {
            return { ...prev, links: [userInfo.links[0], userInfo.links[1], e.target.value] };
          })
        }
      />
    </>
  );
};

export default UserInfoInputs;
