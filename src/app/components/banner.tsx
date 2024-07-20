import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { CSSObject } from '@emotion/react';
import Box from './box';
import image from '../assets/banner/legends.png';
import PFP from '../assets/pfp/placeholder.png';
import Heading from './heading';
import Body from './body';
import Stack from './stack';

type Props = {
  heading?: string;
  description?: string;
  pfp?: string;
  children?: ReactNode;
  localStyles?: CSSObject;
}

const El = styled(Box)(({ localStyles }: Props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--scale-8) var(--scale-24)',
  backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 70%), rgb(0 0 0 / 70%)), url('${image}')`,
  backgroundPosition: 'center center, center center',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundSize: 'cover, cover',
  height: 360,
  width: '100%',
  '@media (min-width: 800px)' :{
    padding: 'var(--scale-48)',
    backgroundImage: `url('${image}')`,
    justifyContent: 'start',
    height: 250,
    backgroundPosition: 'center left',
  },
  '@media (min-width: 1200px)' :{
    height: 300,
  },
  '@media (min-width: 1500px)' :{
    height: 350,
    padding: 'var(--scale-60)',
  },
  ...(localStyles)
}));


const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 'var(--scale-24)',
  '@media (min-width: 800px)' :{
    flexDirection: 'row',
    gap: 'var(--scale-36)',
    alignItems: 'center'
  },
});

const HeadingGroup = styled.div({
  display: 'flex',
  width: 'auto', 
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 'var(--scale-12)',
  '@media (min-width: 800px)' :{
    gap: 'var(--scale-24)',
    alignItems: 'start'
  },
});

const ButtonGroup = styled.div({
  display: 'flex',
  width: 'auto', 
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--scale-12)',
  '@media (min-width: 800px)' :{
    gap: 'var(--scale-12)',
    alignItems: 'start'
  },
});

const Image = styled.img({
  borderRadius: '100%',
  width: 120,
  height: 120,
  '@media (min-width: 1080px)' :{
    width: 140,
    height: 140,
  },
  '@media (min-width: 1200px)' :{
    width: 160,
    height: 160,
  },
  '@media (min-width: 1500px)' :{
    width: 180,
    height: 180,
  },
});

const Banner: FC<Props> = ({ localStyles, pfp = PFP, children, heading = "Title", description = "Description", ...props }) => {
  return (
    <El localStyles={localStyles} {...props}>
      <Content>
        <Image src={pfp} alt={heading} />
        <HeadingGroup>
          <Stack direction='VERTICAL' space={0} localStyles={{alignItems: 'center', textAlign: 'center', '@media (min-width: 800px)' :{ alignItems: 'start'}}}>
            <Heading level="3">{heading}</Heading>
            <Body size='M' localStyles={{maxWidth: '50ch'}}>{description}</Body>
          </Stack>
          <ButtonGroup>
            {children}
          </ButtonGroup>
        </HeadingGroup>
      </Content>
    </El>
  );
}

export default Banner;