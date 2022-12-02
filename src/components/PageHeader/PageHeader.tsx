import { Card, Space } from "antd";
import LanguageSelector from "../LanguageSelector";
import ThemeSwithcer from "../ThemeSwitcher";
import styles from "../../styles/PageHeader.module.css";

type Props = {
  beforeTitle?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
};

const PageHeader = ({ beforeTitle, title, description, children }: Props) => {
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
        <Space>
          <LanguageSelector />
          <ThemeSwithcer />
        </Space>
      }
    >
      {children}
    </Card>
  );
};

export default PageHeader;
