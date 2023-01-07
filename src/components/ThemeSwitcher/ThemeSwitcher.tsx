import { BulbTwoTone, BulbFilled } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import useLocalStorageState from 'use-local-storage-state';
import { useTranslation } from 'next-i18next';

const ThemeSwithcer = () => {
  const { t } = useTranslation(['common']);
  const [useDarkTheme, toggleDarkTheme] = useLocalStorageState(
    'use_dark_theme',
    {
      defaultValue: false,
    }
  );
  return (
    <Tooltip
      title={
        useDarkTheme
          ? t('common:switch_light_mode')
          : t('common:switch_dark_mode')
      }
    >
      <Switch
        checkedChildren={<BulbTwoTone twoToneColor="#000" />}
        unCheckedChildren={<BulbFilled />}
        checked={useDarkTheme}
        onClick={() => {
          toggleDarkTheme(!useDarkTheme);
        }}
      />
    </Tooltip>
  );
};

export default ThemeSwithcer;
