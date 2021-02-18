import { AuthProvider } from '@contexts/auth';
import '@styles/global.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'next-themes'

library.add(fas);

const App = ({ Component, pageProps }) => (

  <AuthProvider>
    <ThemeProvider>
    <Component {...pageProps} />
    </ThemeProvider>
  </AuthProvider>

);

export default App;
