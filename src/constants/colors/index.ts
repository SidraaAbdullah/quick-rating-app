const tintColorLight = '#2f95dc';
const tintColorDark = '#ffffff';

const lightColor = {
  primary: {
    main: '#FCDF6F',
    light: '#FFE685',
  },
  secondary: {
    main: '#FFF6D4',
    light: '#18202c',
  },
  background: {
    default: '#f0f0f0',
    card: '#FCDF6F',
    search: '#303337',
  },
  grey: {
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
  },
  border: {
    main: 'rgba(0, 0, 0, 0.12)',
  },
  divider: {
    main: 'rgba(0, 0, 0, 0.12)',
    light: '#bcbbc1',
  },
  text: {
    primary: '#1E272E',
    secondary: '#485460',
  },
  message: {
    success: '#ff190c',
    error: '#d9534f',
    warning: '#f0ad4e',
  },
  disabled: {
    main: 'hsl(208, 8%, 90%)',
  },
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
  navigation: {
    tint: tintColorLight,
    tabIcon: {
      default: '#ccc',
      selected: tintColorDark,
    },
  },
};

const darkColor = {
  primary: {
    main: '#FCDF6F',
    light: '#FFE685',
  },
  secondary: {
    // main: '#000000',
    main:"#FFF6D4",
    light: '#18202c',
  },
  background: {
    default: '#f0f0f0',
    card: '#FCDF6F',
    search: '#303337',
  },
  grey: {
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
  },
  border: {
    main: 'rgba(0, 0, 0, 0.12)',
  },
  divider: {
    main: 'rgba(0, 0, 0, 0.12)',
    light: '#bcbbc1',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.80)',
    secondary: 'rgba(0, 0, 0, 0.5)',
  },
  message: {
    success: '#ff190c',
    error: '#d9534f',
    warning: '#f0ad4e',
  },
  disabled: {
    main: 'hsl(208, 8%, 90%)',
    // main: '#FFF6D4',
  },
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
  navigation: {
    tint: tintColorLight,
    tabIcon: {
      default: '#ccc',
      selected: tintColorDark,
    },
  },
};

export const COLORS = {
  light: lightColor,
  dark: darkColor,
  'no-preference': lightColor,
};
