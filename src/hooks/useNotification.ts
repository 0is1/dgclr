import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

function useNotification() {
  const openNotification = (message: string, description = '') => {
    api.info({
      message,
      description,
      placement: 'topRight' as NotificationPlacement,
    });
  };
  const [api, contextHolder] = notification.useNotification();
  return { openNotification, contextHolder };
}

export default useNotification;
