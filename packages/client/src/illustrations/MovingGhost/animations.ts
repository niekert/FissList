import { styler, tween, merge, action } from 'popmotion';

export function blissfulAnimation(ghostRef: any) {
  const mouth = styler(ghostRef.querySelector('#Combined-Shape'), {});
  const tongue = styler(ghostRef.querySelector('#kawaii-face__tongue'), {});
  const eyeLeft = styler(
    ghostRef.querySelector('#kawaii-face__eyes__arc path:first-child'),
    {},
  );
  const eyeRight = styler(
    ghostRef.querySelector('#kawaii-face__eyes__arc path:last-child'),
    {},
  );

  const showEye = tween({
    from: { scaleY: 0 },
    to: { scaleY: 1 },
    duration: 200,
  });

  const show = tween({
    from: { scaleY: 0 },
    to: { scaleY: 1 },
    duration: 200,
  });

  const blinkEye = tween({
    from: { scaleY: 1 },
    to: { scaleY: 0.3 },
    duration: 50,
    flip: 1,
  });

  const closeMouth = tween({
    from: { scaleY: 1 },
    to: { scaleY: 0.3 },
    duration: 300,
    flip: 1,
  });

  const tongueDisappear = tween({
    from: { scaleY: 1 },
    to: { scaleY: 0 },
    duration: 300,
    flip: 1,
  });

  const eyeLeftAction = action(({ complete }) => {
    showEye.start({
      update: eyeLeft.set,
      complete: () => {
        complete();
        setInterval(() => blinkEye.start({ update: eyeLeft.set }), 2000);
      },
    });
  });

  const eyeRightAction = action(({ complete }) => {
    showEye.start({
      update: eyeRight.set,
      complete: () => {
        complete();
        setInterval(() => blinkEye.start({ update: eyeRight.set }), 2000);
      },
    });
  });

  const mouthAction = action(({ complete }) => {
    show.start({
      update: mouth.set,
      complete: () => {
        complete();
        setInterval(() => closeMouth.start({ update: mouth.set }), 3500);
      },
    });
  });

  const tongueAction = action(({ complete }) => {
    show.start({
      update: tongue.set,
      complete: () => {
        complete();
        setInterval(() => tongueDisappear.start({ update: tongue.set }), 3500);
      },
    });
  });

  return merge(eyeLeftAction, eyeRightAction, mouthAction, tongueAction);
}
