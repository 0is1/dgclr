import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import type { SortOrder } from "antd/lib/table/interface";
import Link from "next/link";
import { Course } from "../../types";
import useLocalStorageState from "use-local-storage-state";
import { COURSE_QUERY, SERVER_URL } from "../../graphql/queries";
import { useTranslation } from "next-i18next";

const SEARCH_COURSES = `
  query CoursesQuery($query: String!) {
    courseByName(query: $query) {
      ${COURSE_QUERY}
    }
  }
`;

function SearchQuery() {
  const { t } = useTranslation(["common"]);
  const router = useRouter();
  const [query] = useLocalStorageState("text_search", {
    defaultValue: "",
  });
  const { data, isLoading } = useQuery<{ courseByName: Course[] }>({
    queryKey: [`courseByName_${query}`],
    queryFn: async () => request(SERVER_URL, SEARCH_COURSES, { query }),
  });
  const columns = [
    {
      title: `${t("common:course_name")}`,
      dataIndex: "name",
      key: "name",
      showSorterTooltip: false,
      defaultSortOrder: "ascend" as SortOrder,
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
        return <Link href={`/course/${record.slug}`}>{text}</Link>;
      },
    },
  ];
  return (
    <Table
      dataSource={data?.courseByName}
      columns={columns}
      loading={isLoading}
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
