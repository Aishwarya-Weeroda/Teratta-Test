import {useSelector} from 'react-redux';
import {useColorScheme} from 'react-native';

export const BaseColor = {
  grayColor: '#9B9B9B',
  dividerColor: '#BDBDBD',
  whiteColor: '#FFFFFF',
  fieldColor: '#F5F5F5',
  yellowColor: '#FDC60A',
  navyBlue: '#3C5A99',
  kashmir: '#5D6D7E',
  orangeColor: '#E5634D',
  blueColor: '#5DADE2',
  pinkColor: '#A569BD',
  greenColor: '#58D68D',
};

const themeGreen = {
  theme: 'green',
  light: {
    dark: false,
    colors: {
      primary: '#11998E',
      secondary: '#38EF7D',
      primaryDark: '#C31C0D',
      secondaryDark: '',
      primaryLight: '#2dd4bf',
      secondaryLight: '',
      accent: '#4A90A4',
      background: 'white',
      tabBg: '#fafaf9',
      backgroundWhite: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#11998E',
      secondary: '#38EF7D',
      primaryDark: '#C31C0D',
      secondaryDark: '',
      primaryLight: '#FF8A65',
      secondaryLight: '',
      accent: '#4A90A4',
      background: '#010101',
      tabBg: '#010101',
      backgroundWhite: 'white',
      card: '#121212',
      text: '#e5e5e7',
      border: '#272729',
    },
  },
};
const themeOrange = {
  theme: 'scooter',
  light: {
    dark: false,
    colors: {
      primary: '#2E3192',
      secondary: '#1BFFFF',
      primaryDark: '#C31C0D',
      secondaryDark: '',
      primaryLight: '#FF8A65',
      secondaryLight: '',
      accent: '#4A90A4',
      background: 'white',
      tabBg: '#fafaf9',
      backgroundWhite: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#2E3192',
      secondary: '#1BFFFF',
      primaryDark: '#C31C0D',
      secondaryDark: '',
      primaryLight: '#FF8A65',
      secondaryLight: '',
      accent: '#4A90A4',
      background: '#010101',
      tabBg: '#010101',
      backgroundWhite: 'white',
      card: '#121212',
      text: '#212121',
      border: '#272729',
    },
  },
};

export const ThemeSupport = [
  {...themeGreen},
  {...themeOrange},
  {
    theme: 'pink',
    light: {
      dark: false,
      colors: {
        primary: '#662D8C',
        secondary: '#ED1E79',
        primaryDark: '#C2185B',
        primaryLight: '#db2777',
        accent: '#8BC34A',
        background: 'white',
        tabBg: '#fafaf9',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#662D8C',
        secondary: '#ED1E79',
        primaryDark: '#C2185B',
        primaryLight: '#F8BBD0',
        accent: '#8BC34A',
        background: '#010101',
        tabBg: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
];

/**
 * Define default theme use for whole application
 */
export const DefaultTheme = {
  ...themeOrange,
};

export const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const forceDark = useSelector(state => state.application.force_dark);
  const themeStorage = useSelector(state => state.application.theme);
  const theme = ThemeSupport.find(
    item => item.theme === (themeStorage ?? DefaultTheme.theme),
  );

  if (forceDark || isDarkMode) {
    return {theme: theme.dark, colors: theme.dark.colors};
  }
  return {theme: theme.light, colors: theme.light.colors};
};
