import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useQuery } from "react-query";
import { Table } from "../../Components/Table/Table";

const Calisan = () => {
  const fetchData = async () => {
    const response = await axios
      .get("/api/v1/employees")
      .then((response) => response.data);
    return response.data;
  };
  const { data } = useQuery('users', fetchData,{
    cacheTime: Infinity

  });

  const columnHelper = createColumnHelper<any>();
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
      meta: {
        required: true,
        readOnly: true,
      },
    }),
    columnHelper.accessor("employee_name", {
      header: "Ad ve Soyad",

      meta: {
        type: "text",
        required: true,
      },
    }),
    columnHelper.accessor("employee_salary", {
      header: "Maaş",
      meta: {
        required: true,
      },
    }),
    columnHelper.accessor("employee_age", {
      header: "Yaş",
      meta: {
        required: true,
      },
    }),
    columnHelper.accessor("profile_image", {
      header: "Profil Fototğrafı",
      meta: {
        required: true,
      },
    }),
  ];
  return (
    <>
      <Table
        calisan
        hideNewButton
        selection={true}
        delete={true}
        data={data ? data : ""}
        uniqueAccessorKey="urunKodu"
        columns={columns}
      ></Table>
    </>
  );
};

export default Calisan;
