import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TextInput,
  Button,
  Group,
  Container,
  Loader,
  Title,
  Pagination,
  Select,
  Box,
  createStyles,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
}

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors.blue[7],
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s ease",

    "&:hover": {
      color: theme.colors.blue[5],
    },
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: rem(6),
    border: `1px solid ${theme.colors.gray[3]}`,
    boxShadow: theme.shadows.sm,
  },
  tableHeader: {
    backgroundColor: theme.colors.gray[1],
    fontWeight: 600,
  },
  container: {
    padding: rem(20),
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: rem(10),
    },
  },
}));

const fetchLaunches = async (): Promise<Launch[]> => {
  const res = await fetch("https://api.spacexdata.com/v4/launches");
  return res.json();
};

export default function ResourceList() {
  const { classes } = useStyles();
  const { data, isLoading } = useQuery(["launches"], fetchLaunches);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [yearFilter, setYearFilter] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return yearFilter
      ? data.filter((launch) =>
          new Date(launch.date_utc).getFullYear().toString() === yearFilter
        )
      : data;
  }, [data, yearFilter]);

  const launchYears = useMemo(() => {
    if (!data) return [];
    const years = Array.from(
      new Set(data.map((launch) => new Date(launch.date_utc).getFullYear()))
    );
    return years.sort().map((year) => year.toString());
  }, [data]);

  const columns = useMemo<ColumnDef<Launch>[]>(
    () => [
      {
        header: "Mission Name",
        accessorKey: "name",
        cell: (info) => (
          <Link
            to={`/resources/${info.row.original.id}`}
            className={classes.link}
          >
            {info.getValue() as string}
          </Link>
        ),
      },
      {
        header: "Launch Date",
        accessorKey: "date_utc",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
    ],
    [classes.link]
  );

  const table = useReactTable({
    data: filteredData || [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader size="xl" />
      </Container>
    );
  }
  

  return (
    <Container className={classes.container}>
      <Title mb="md" order={2}>
        🚀 SpaceX Launches
      </Title>

      <Group grow mb="md">
        <TextInput
          placeholder="Search launches by name..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.currentTarget.value)}
        />
        <Select
          placeholder="Filter by year"
          data={launchYears}
          value={yearFilter}
          onChange={setYearFilter}
          clearable
        />
      </Group>

      <Box className={classes.tableWrapper}>
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead className={classes.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      <Group position="apart" mt="md">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Pagination
          total={table.getPageCount()}
          value={table.getState().pagination.pageIndex + 1}
          onChange={(page) => table.setPageIndex(page - 1)}
        />

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Group>
    </Container>
  );
}
