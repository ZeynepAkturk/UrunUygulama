import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "react-query";
import { calisanQueryClient } from "../../../App";

const createUser = async (newUserData: any) => {
  const response = await axios.post("/api/v1/create", newUserData);
  return response.data;
};

const updateUser = async (userId: any, updatedUserData: any) => {
  const response = await axios.put(`/api/v1/update/${userId}`, updatedUserData);
  return response.data;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

const RecordSchema = z.object({
  employee_name: z.string().min(1, { message: "Ad girilmesi zorunludur!" }),
  employee_salary: z.string().min(1, { message: "Maaş girilmesi zorunludur." }),
  employee_age: z.string().min(1, { message: "Yaş girilmesi zorunludur." }),
  id: z.string().nullish(), //null
});
type RecordSchemaType = z.infer<typeof RecordSchema>;


type RecordModalProps = {
  table: any;
  openIslem?: boolean;
  handleClose?: any;
  onSelected?: (val?: any) => void;
};

const RecordModal = (props: RecordModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordSchemaType>({ resolver: zodResolver(RecordSchema) });

  const selectedRow = props.table.getSelectedRowModel().rows[0]?.original;
  const deger = selectedRow?.id;

  const createMutation = useMutation(createUser, {
    onSuccess: (data) => {
      calisanQueryClient.setQueryData("users", (prevData: any) => {
        return [...prevData, data.data];
      });
    },
  });

  const updateUserMutation = useMutation(
    (params: any) => updateUser(params?.deger, params?.veri),
    {
      onSuccess: (data) => {
        calisanQueryClient.setQueryData("users", (prevData: any) =>
          prevData.map((employee: any) =>
            employee.id === deger ? { ...employee, ...data.data } : employee
          )
        );
      },
    }
  );

  // const deleteUserMutation=useMutation
 

  const onSubmit = async (veri: any) => {
    if (selectedRow) {
      updateUserMutation.mutate({ deger, veri });
      props.handleClose();
    } else {
      createMutation.mutate(veri);
      props.handleClose();
      
    }
  };

  return (
    <div>
      <Modal
        id="modalIslem"
        open={props.openIslem ?? false}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <input
                className="input"
                placeholder={
                  selectedRow
                    ? selectedRow.employee_name
                    : "Ad ve Soyad giriniz..."
                }
                {...register("employee_name")}
              />
              {errors.employee_name && (
                <span>{errors.employee_name.message}</span>
              )}
              <input
                className="input"
                type="number"
                placeholder={
                  selectedRow ? selectedRow.employee_salary : "Maaş giriniz.."
                }
                {...register("employee_salary")}
              />
              {errors.employee_salary && (
                <span>{errors.employee_salary.message}</span>
              )}
              <input
                className="input"
                type="number"
                placeholder={
                  selectedRow ? selectedRow.employee_age : "Yaş giriniz.."
                }
                {...register("employee_age")}
              />
              {errors.employee_age && (
                <span>{errors.employee_age.message}</span>
              )}
              <button type="submit">{selectedRow ? "Güncelle" : "Ekle"}</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default RecordModal;
