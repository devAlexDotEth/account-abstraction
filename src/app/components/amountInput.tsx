import { FC, ReactNode } from 'react';
import Body from './body';
import Stack from './stack';
import Button from './button';
import Box from './box';

type Props = {
  decrease?: () => void;
  increase?: () => void;
  amount?: ReactNode;
}

const AmountInput: FC<Props> = ({ decrease, increase, amount = 0, ...props }) => {
  return (
    <Stack direction="HORIZONTAL" space={0} localStyles={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: 'var(--scale-12)'}} {...props}>
      <Button size='M' variant="SECONDARY" href='Decrease' target="_blank" localStyles={{width: 50, borderTopRightRadius: 0, borderBottomRightRadius: 0}}>-</Button>
      <Box 
        localStyles={{
          borderTop: '1px solid var(--button-border)', 
          borderBottom: '1px solid var(--button-border)', 
          padding: 12
        }}>
          <Body size='M' localStyles={{lineHeight: 1}}>{amount}</Body>
      </Box>
      <Button size='M' variant="SECONDARY" href='Increase' target="_blank" localStyles={{width: 50, borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}>+</Button>
    </Stack>
  );
}

export default AmountInput;