interface Image {
  width: number;
  height: number;
  url: string;
}

// TODO: probably need to improve this
export function findDesiredSize(
  width: number,
  height: number,
  images: Image[],
): Image | undefined {
  return images.find(image => {
    return image.width > width && image.height > height;
  });
}
