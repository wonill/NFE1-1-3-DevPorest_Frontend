/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TechStackType } from './TechStack';

export const Button = styled.button<Pick<TechStackType, 'backgroundColor' | 'color'>>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.SMALL};
  border: none;
  border-radius: 100rem;
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
`;
