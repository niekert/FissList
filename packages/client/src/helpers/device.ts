// TODO: IS there a nicer way to detect touch devices to hide keyboard?
export const isTouchDevice = 'ontouchstart' in document.documentElement!;
