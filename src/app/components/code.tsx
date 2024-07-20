// Code.tsx
import React, { ReactNode } from 'react';
import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';

interface CodeProps {
  children: ReactNode;
  customStyles?: CSSObject;
}

const Outer = styled.code<CodeProps>`
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  background-color: var(--dark-500);
  padding: 8px;
  border: 1px solid var(--dark-300);
  display: block;
  border-radius: 4px;
  color: var(--tint);
  font-size: var(--scale-12);
  ${(props) => props.customStyles}
`;

const Code: React.FC<CodeProps> = ({ children, customStyles }) => {
  return <Outer customStyles={customStyles}>{children}</Outer>;
};

export default Code;