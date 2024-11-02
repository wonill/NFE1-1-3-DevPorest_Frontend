import React from "react";
import { UserInfoInput, IconWrapper, Input } from "./InfoInput.styles";

interface UserInfoInputProps {
  icon: string;
  placeholder: string;
  value: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InfoInput: React.FC<UserInfoInputProps> = ({ icon, placeholder, value, error, onChange }) => (
  <UserInfoInput>
    <IconWrapper>
      <img src={icon} alt="" />
    </IconWrapper>
    <Input type="text" placeholder={placeholder} value={value} onChange={onChange} error={error} />
  </UserInfoInput>
);

export default InfoInput;
