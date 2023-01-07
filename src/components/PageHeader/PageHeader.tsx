import { Card, Space } from 'antd';
import LanguageSelector from '../LanguageSelector';
import ThemeSwithcer from '../ThemeSwitcher';
import styles from '../../styles/PageHeader.module.css';
import useWindowSize from '../../hooks/useWindowSize';

type Props = {
  beforeTitle?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
};

const PageHeader = ({ beforeTitle, title, description, children }: Props) => {
  const { isMobileWidth } = useWindowSize();
  return (
    <Card
      className={styles.header}
      title={
        <Space>
          {beforeTitle}
          {title}
          {description}
        </Space>
      }
      bordered={false}
      extra={
        !isMobileWidth && (
          <Space size="large">
            <LanguageSelector />
            <ThemeSwithcer />
          </Space>
        )
      }
    >
      {children}
    </Card>
  );
};

export default PageHeader;
