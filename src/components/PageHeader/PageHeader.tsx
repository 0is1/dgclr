import { BulbTwoTone, BulbOutlined, BulbFilled } from "@ant-design/icons";
import { Card, Space, Switch, Tooltip } from "antd";
import useLocalStorageState from "use-local-storage-state";
import styles from "../../styles/PageHeader.module.css";

type Props = {
  beforeTitle?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
};

const PageHeader = ({ beforeTitle, title, description, children }: Props) => {
  const [useDarkTheme, toggleDarkTheme] = useLocalStorageState(
    "use_dark_theme",
    {
      defaultValue: false,
    }
  );
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
        <Tooltip
          title={useDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Switch
            checkedChildren={<BulbTwoTone twoToneColor="#000" />}
            unCheckedChildren={<BulbFilled />}
            checked={useDarkTheme}
            onClick={() => toggleDarkTheme(!useDarkTheme)}
          />
        </Tooltip>
      }
    >
      {children}
    </Card>
  );
};

export default PageHeader;
