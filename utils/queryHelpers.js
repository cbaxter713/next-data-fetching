export const responsiveImage = (params) => {
  const imgixParams = params || 'fit: crop, w: 300, h: 300, auto: format';
  return `
    responsiveImage(imgixParams: { ${imgixParams} }) {
      srcSet
      webpSrcSet
      sizes
      src
      width
      height
      aspectRatio
      alt
      title
      base64
    }
  `;
}
