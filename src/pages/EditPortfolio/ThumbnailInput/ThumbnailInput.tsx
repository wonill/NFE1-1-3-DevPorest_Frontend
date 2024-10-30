import { useState } from "react";
import { ThumbnailInputWrapper } from "./ThumbnailInput.styles";

// useState의 set함수를 props로 전달받음
interface ThumbnailInputProps {
  setPreviewThumbnail: React.Dispatch<React.SetStateAction<string>>;
}

const ThumbnailInput: React.FC<ThumbnailInputProps> = ({
  setPreviewThumbnail,
}) => {
  const [thumbnailFileName, setThumbnailFileName] =
    useState<string>("대표사진 선택");

  const getThumbnail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "image/avif",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "지원하지 않는 이미지 형식입니다. JPG, PNG, GIF, WebP, SVG, AVIF 형식만 업로드 가능합니다."
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewThumbnail(result);
      };

      reader.onerror = () => {
        alert("파일을 읽는 도중 오류가 발생했습니다.");
      };

      reader.readAsDataURL(file);
      setThumbnailFileName(file.name);
    }
  };

  const deleteFile = () => {
    setThumbnailFileName("대표사진 선택");
    setPreviewThumbnail("");
  };
  return (
    <ThumbnailInputWrapper>
      <label htmlFor="file">
        <img src="/folder-icon.svg" alt="" />
        <i>{thumbnailFileName}</i>
      </label>
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml, image/avif"
        id="file"
        onChange={getThumbnail}
      />
      <button className="deleteBtn" onClick={deleteFile}>
        x
      </button>
    </ThumbnailInputWrapper>
  );
};
export default ThumbnailInput;
