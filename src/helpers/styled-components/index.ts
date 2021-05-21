export const breakpoints = {
  min: 425,
  sm: 540,
  md: 720,
  md_bootstrap: 768,
  lg: 960,
  xl: 1140,
  xxl: 1212,
  max: 2100,
};

/**
 * Функция возвращаюшая нам @media (max-width) с указанной нам ширинной.
 * @param key
 */
export const mediaQueries = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | String) =>
    `@media (max-width: ${breakpoints[key]}px) { ${style} }`;
};

//Ширина для sidebar
export const widthSidebar = 86;
