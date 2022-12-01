import {
  SlidersOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { MenuProps, Tabs } from "antd";
import { Menu, Space, Button } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SiteMenu = () => {
  const { t } = useTranslation(["common"]);
  const router = useRouter();
  const currentRoute = router.pathname;
  const [current, setCurrent] = useState(currentRoute);

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
    setCurrent(e.key);
  };
  //   const onClick = (e: React.MouseEvent<HTMLElement>) => {
  //     console.log("click ", e.currentTarget);
  //     router.push(e.currentTarget.id);
  //     // router.push(e.key);
  //     // setCurrent(e.key);
  //   };
  //   const onChange = (key: string) => {
  //     console.log(key);
  //     router.push(key);
  //     setCurrent(key);
  //   };

  //   return (
  //     <Tabs
  //       defaultActiveKey={current}
  //       onChange={onChange}
  //       items={[
  //         {
  //           label: (
  //             <Space size="small">
  //               <SearchOutlined />
  //               {t("common:menu_text_search")}
  //             </Space>
  //           ),
  //           key: "/",
  //         },
  //         {
  //           label: (
  //             <Space size="small">
  //               <SlidersOutlined />
  //               {t("common:menu_text_advanced_search")}
  //             </Space>
  //           ),
  //           key: "/advanced_search",
  //         },
  //         {
  //           label: (
  //             <Space size="small">
  //               <InfoCircleOutlined />
  //               {t("common:menu_text_info")}
  //             </Space>
  //           ),
  //           key: "/info",
  //         },
  //       ]}
  //     />
  //   );
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      theme="dark"
      mode="horizontal"
      items={[
        {
          label: t("common:menu_text_search"),
          key: "/",
          icon: <SearchOutlined />,
        },
        {
          label: t("common:menu_text_advanced_search"),
          key: "/advanced_search",
          icon: <SlidersOutlined />,
        },
        {
          label: t("common:menu_text_info"),
          key: "/info",
          icon: <InfoCircleOutlined />,
        },
      ]}
    />
  );
};

export default SiteMenu;
