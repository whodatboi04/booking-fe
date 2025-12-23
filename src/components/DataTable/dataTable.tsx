import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
  Pagination,
} from "@heroui/react";

type Header = {
  key: string;
  header: string;
};

type Props = {
  headers: Header[];
  data: any;
  loading: boolean;
  renderers?: { [key: string]: (value: any, row?: any) => React.ReactNode };
  pages: number;
  page: number;
  onPageChange?: (page: number) => void;
};

const dataTable = ({
  headers,
  data,
  loading,
  renderers = {},
  pages = 10,
  page = 1,
  onPageChange,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Table
        aria-label="User table"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(newPage) => onPageChange && onPageChange(newPage)}
              />
            </div>
          ) : null
        }
      >
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
                  {renderers && renderers[columnKey]
                    ? renderers[columnKey](item[columnKey], item)
                    : getKeyValue(item, columnKey)}
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
