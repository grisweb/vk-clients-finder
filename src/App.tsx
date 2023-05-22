import { AppRoot, ConfigProvider, WebviewType } from '@vkontakte/vkui';
import { RouterProvider } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';

import router from 'constants/router';

const App = () => {
  const appearance = useAppSelector((state) => state.layout.appearance);

  return (
    <ConfigProvider
      platform="android"
      webviewType={WebviewType.INTERNAL}
      appearance={appearance}
    >
      <AppRoot>
        <RouterProvider router={router} />
      </AppRoot>
    </ConfigProvider>
  );
};

export default App;
