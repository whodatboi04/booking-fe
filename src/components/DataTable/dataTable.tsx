import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@heroui/react";
import { Failed, Success } from "../Status/status";

type Header = {
  key: string;
  header: string;
};

type Props = {
  headers: Header[];
  data: any;
  loading: boolean;
};

const dataTable = ({ headers, data, loading }: Props) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="User table">
        <TableHeader>
          {headers.map((header) => (
            <TableColumn key={header.key}>{header.header}</TableColumn>
          ))}
        </TableHeader>

        <TableBody
          items={data?.data ?? []}
          isLoading={loading}
          loadingContent={<Spinner />}
          emptyContent={"No user"}
        >
          {(item: any) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "status" ? (
                    item.status === 1 ? (
                      <Success>Active</Success>
                    ) : (
                      <Failed>Inactive</Failed>
                    )
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default dataTable;
