interface HeadingProps {
  palette: string;
  reverse: boolean;
  level: levelProp;
  children: React.ReactNode;
  theme?: any;
}

type levelProp = 1 | 2 | 3 | 4;
