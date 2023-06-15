import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  WebviewType
} from '@vkontakte/vkui';
import { RouterProvider } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';

import router from 'constants/router';

const App = () => {
  const appearance = useAppSelector((state) => state.layout.appearance);

  return (
    <ConfigProvider
      platform="android"
      webviewType={WebviewType.INTERNAL}
      isWebView={false}
      locale="ru"
      transitionMotionEnabled={false}
      appearance={appearance}
    >
      <AdaptivityProvider>
        <AppRoot mode="full" scroll="global">
          <RouterProvider router={router} />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
