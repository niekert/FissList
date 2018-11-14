import posed from 'react-pose';

const PosedListItem = posed.div({
  enter: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: ({ i, delayBase = 600 }) => ({
      type: 'spring',
      stiffness: 180,
      damping: 15,
      delay: Math.min(i * 100, delayBase),
      duration: 300,
    }),
  },
  exit: {
    opacity: 0,
    transform: 'translateY(15px)',
  },
  props: {
    i: 0,
  },
});

export default PosedListItem;
