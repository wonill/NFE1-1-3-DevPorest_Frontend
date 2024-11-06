import { useEffect, useState } from "react";
import { AlertWrapper } from "./Alert.styles";

interface AlertProps {
  text: string;
}
const Alert: React.FC<AlertProps> = ({ text }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // 2초 후 사라지도록 설정
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return <AlertWrapper visible={visible}>{text}</AlertWrapper>;
};

export default Alert;
