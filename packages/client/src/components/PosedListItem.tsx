import posed from 'react-pose';

const PosedListItem = posed.div({
  enter: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: ({ i, delayBase = 100 }) => ({
      type: 'spring',
      stiffness: 180,
      damping: 15,
      delay: Math.min(i * delayBase, delayBase * 10),
      duration: 300,
    }),
  },
  exit: {
    opacity: 0,
    transform: 'translateY(15px)',
    transition: {
      duration: 150,
    },
  },
  props: {
    i: 0,
  },
});

export default PosedListItem;
