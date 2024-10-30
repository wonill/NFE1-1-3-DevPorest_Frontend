import React, { forwardRef } from "react";
import { ProfileImageWrapper, PencilImage, SetProfileModal } from "./ProfileImage.styles";
import profileAdd from "../../assets/profile-add.svg";
import noImg from "../../assets/no_image.svg";

interface ProfileImageProps {
  imageUrl: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSetDefaultProfile: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>(
  ({ imageUrl, onImageChange, onSetDefaultProfile, isModalOpen, setIsModalOpen }, ref) => {
    return (
      <ProfileImageWrapper>
        <img src={imageUrl || `${noImg}`} alt="Profile" />
        <PencilImage onClick={() => setIsModalOpen(!isModalOpen)}>
          <img src={profileAdd} alt="Edit" />
        </PencilImage>
        <input id="fileInput" type="file" accept="image/*" onChange={onImageChange} />
        {isModalOpen && (
          <SetProfileModal ref={ref}>
            <button
              onClick={() => {
                document.getElementById("fileInput")?.click();
                setIsModalOpen(false);
              }}
            >
              프로필 변경
            </button>
            {imageUrl && (
              <button
                onClick={() => {
                  onSetDefaultProfile();
                  setIsModalOpen(false);
                }}
              >
                기본 프로필로 설정
              </button>
            )}
          </SetProfileModal>
        )}
      </ProfileImageWrapper>
    );
  }
);

export default ProfileImage;
