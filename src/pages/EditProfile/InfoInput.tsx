import React from "react";
import { UserInfoInput, IconWrapper, Input } from "./InfoInput.styles";

interface UserInfoInputProps {
  icon: string;
  placeholder: string;
}

const InfoInput: React.FC<UserInfoInputProps> = ({ icon, placeholder }) => (
  <UserInfoInput>
    <IconWrapper>
      <img src={icon} alt="" />
    </IconWrapper>
    <Input type="text" placeholder={placeholder} />
  </UserInfoInput>
);

export default InfoInput;
