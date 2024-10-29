import React from "react";
import { ProfileImageWrapper, PencilImage } from "./ProfileImage.styles";
import pencil from "../../assets/pencil.svg";

interface ProfileImageProps {
  imageUrl: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, onImageChange }) => {
  return (
    <ProfileImageWrapper>
      <img
        src={
          imageUrl ||
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300"
        }
        alt="Profile"
      />
      <PencilImage onClick={() => document.getElementById("fileInput")?.click()}>
        <img src={pencil} alt="Edit" />
      </PencilImage>
      <input id="fileInput" type="file" accept="image/*" onChange={onImageChange} />
    </ProfileImageWrapper>
  );
};

export default ProfileImage;
