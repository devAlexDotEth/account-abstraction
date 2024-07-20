import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { CSSObject } from '@emotion/react';
import Box from './box';
import PFP from '../assets/pfp/placeholder.png';
import Heading from './heading';
import Body from './body';

type ElProps = {
  heading?: string;
  pfp?: string;
  description?: string;
  children?: ReactNode;
  localStyles?: CSSObject;
}

type Props = {
  heading?: string;
  direction: 'HORIZONTAL' | 'VERTICAL';
  pfp?: string;
  description?: string;
  children?: ReactNode;
  localStyles?: CSSObject;
}

const El = styled(Box)(({ localStyles }: ElProps) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',
  background: 'var(--dark-300)',
  width: '100%',
  borderRadius: 'var(--scale-8)',
  overflow: 'hidden',
  ...(localStyles)
}));


const Content = styled.div(({ direction = "VERTICAL"}: Props) => ({
  display: 'flex',
  width: '100%',
  ...(direction === "VERTICAL" && {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  }),
  ...(direction === "HORIZONTAL" && {
    flexDirection: 'column',
    alignItems: 'center',
    '@media (min-width: 1200px)': {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }),
}));


const Inner = styled.div(({ direction = "VERTICAL"}: Props) => ({
  display: 'flex',
  width: '100%', 
  flexDirection: 'column',
  gap: 'var(--scale-12)',
  justifyContent: 'center',
  ...(direction === "VERTICAL" && {
    padding: 'var(--scale-36) var(--scale-12) var(--scale-12) var(--scale-12)',
    alignItems: 'center',
    '@media (min-width: 600px)': {
      padding: 'var(--scale-36) var(--scale-12)',
    }
  }),
  ...(direction === "HORIZONTAL" && {
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--scale-36) var(--scale-12) var(--scale-12) var(--scale-12)',
    alignItems: 'center',
    '@media (min-width: 600px)': {
      padding: 'var(--scale-36) var(--scale-12)',
    },
    '@media (min-width: 1200px)': {
      padding: '0 var(--scale-60)',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
    }
  }),
}));

const HeadingGroup = styled.div(({ direction = "VERTICAL"}: Props) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--scale-4)',
  ...(direction === "VERTICAL" && {
    alignItems: 'center',
    textAlign: 'center',
  }),
  ...(direction === "HORIZONTAL" && {
    alignItems: 'center',
    '@media (min-width: 1200px)': {
      alignItems: 'start',
    }
  }),
}));

const ButtonGroup = styled.div(({ direction = "VERTICAL"}: Props) => ({
    width: '100%',
    gap: 'var(--scale-12)',
  ...(direction === "VERTICAL" && {
    display: 'grid',
    marginTop: 'var(--scale-12)',
    gridTemplateColumns: '1fr',
    '@media (min-width: 600px)': {
      maxWidth: 200
    }
  }),
  ...(direction === "HORIZONTAL" && {
    display: 'grid',
    marginTop: 'var(--scale-12)',
    gridTemplateColumns: '1fr',
    '@media (min-width: 600px)': {
      maxWidth: 200
    },
    '@media (min-width: 1200px)': {
      display: 'flex',
      marginTop: 0,
      flexDirection: 'row',
      alignItems: 'start',
      maxWidth: 'initial',
    }
  }),
}));

const Image = styled.img(({ direction = "VERTICAL"}: Props) => ({
  ...(direction === "VERTICAL" && {
    width: '100%',
    height: 'auto',
  }),
  ...(direction === "HORIZONTAL" && {
    width: '100%',
    height: 'auto',
    '@media (min-width: 1200px)': {
      width: 204,
      height: 204,
    }
  }),
}));

const Card: FC<Props> = ({ localStyles, pfp = PFP, description = "Collection Size • 6969", children, heading = "Title", direction = 'HORIZONTAL', ...props }) => {
  return (
    <El localStyles={localStyles} {...props}>
      <Content direction={direction}>
        <Image direction={direction} src={pfp} alt={heading} />
        <Inner direction={direction}>
          <HeadingGroup direction={direction} localStyles={{width: 'auto'}}>
            <Heading level="4">{heading}</Heading>
            <Body size='S'>{description}</Body>
          </HeadingGroup>
          <ButtonGroup direction={direction}>
            {children}
          </ButtonGroup>
        </Inner>
      </Content>
    </El>
  );
}

export default Card;