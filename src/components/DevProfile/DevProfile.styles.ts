import styled from '@emotion/styled';
import { SwiperSlide } from 'swiper/react';

export const DevProfileCard = styled.div`
  font-family: 'Pretendard', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  padding: ${({ theme }) => theme.PADDINGS.MEDIUM};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  height: 370px;
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  cursor: pointer;
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

export const Name = styled.span`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.DEFAULT};
  font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
`;

export const Category = styled.span`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THIN};
  font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
`;

export const Intro = styled.p`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THIN};
  font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
  text-align: center;
  max-height: 30%;
`;

export const TechStacks = styled.div`
  width: 100%;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  width: auto;
  flex: none;
`;
