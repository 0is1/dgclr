import { useQuery } from "@tanstack/react-query";
import { Space, Table, Tag } from "antd";
import { useRouter } from "next/router";
import type { SortOrder } from "antd/lib/table/interface";
import Link from "next/link";
import useLocalStorageState from "use-local-storage-state";
import { useTranslation } from "next-i18next";
import { Course } from "../../types";

import { getCoursesByName } from "../../graphql/fetcher";
import { DoubleRightOutlined } from "@ant-design/icons";
import { getRatingListFromCourseLayouts } from "../../helpers/course";

function SearchQuery() {
  const { t } = useTranslation(["common"]);
  const router = useRouter();
  const [query] = useLocalStorageState("text_search", {
    defaultValue: "",
  });
  const [currentPageForQuery, setCurrentPageForQuery] = useLocalStorageState(
    `current_page_${query}`,
    {
      defaultValue: 1,
    }
  );
  const { data, failureReason, isError, isLoading } = useQuery({
    queryKey: [`courseByName_${query}`],
    queryFn: async () => {
      const data = await getCoursesByName(query);
      return data;
    },
    retry: 2,
  });
  if (isError) {
    console.log(failureReason);
    return (
      <div>
        <>{t("common:search_error")}</>
      </div>
    );
  }
  const columns = [
    {
      title: `${t("common:course_name")}`,
      dataIndex: "name",
      key: "name",
      showSorterTooltip: false,
      sorter: (a: Course, b: Course) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      render: (text: string, record: Course) => {
        const tags = getRatingListFromCourseLayouts(record);
        return (
          <Space>
            <Link href={`/course/${record.slug}`}>
              {text} <DoubleRightOutlined />
            </Link>
            <span>
              {tags.map((tag) => (
                <Tag color="blue" key={tag.key}>
                  {tag.rating}
                </Tag>
              ))}
            </span>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={data?.courseByName}
      columns={columns}
      loading={isLoading}
      rowKey="_id"
      pagination={{
        current: currentPageForQuery,
        onChange: (page) => {
          setCurrentPageForQuery(page);
        },
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            router.push(`/course/${record.slug}`);
          },
        };
      }}
    />
  );
}

export default SearchQuery;
