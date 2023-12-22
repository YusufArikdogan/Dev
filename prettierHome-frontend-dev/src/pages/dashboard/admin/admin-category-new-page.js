import React, { useState } from "react";
import Spacer from "../../../components/common/spacer";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbFaceIdError } from "react-icons/tb";
import ButtonComponent from "../../../components/common/button-component";
import { saveCategory } from "../../../api/categories-service";
import AdminCategoryNewCommon from "../../../components/dashboard/admin/categories/admin-category-new";
import { useToast } from "../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import PropertyKeyNewPage from "../../../components/dashboard/admin/categories/property-key-new-page";
import { useDispatch } from "react-redux";
import { setCurrentRecord } from "../../../store/slices/misc-slice";

const AdminCategoryNewPage = () => {

  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(null)
  const [loading, setLoading] = useState(false);
  const {showToast}  = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false)

  const initialValues = {
    title: normalizeTitle(""),
    icon: "",
    seq: null,
    active: false
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Enter a title")
      .min(3, "Title must be at least 3 characters")
      .max(150, "Title can be at most 150 characters"),
    icon: Yup.string()
      .required("Enter an icon"),
    seq: Yup.number()
      .required("Enter a sequence")
      .positive("Sequence must be positive")
  });

function normalizeTitle(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // .replace(/ı/g, "i")
}

  const onSubmit = async (values) => {
    setLoading(true);

    try {

      const { ...rest } = values;
      // const category = {
      //   ...rest
      // };

      const resp = await saveCategory({...values, title: normalizeTitle(values.title)});
      setCategoryId(resp.id)
      dispatch(setCurrentRecord(resp));
      setShow(true)
      // resetForm();

      showToast({
        severity: "success",
          summary: "Saved!",
          detail: "Category is saved successfully",
          life: 2000,
          icon: <IoMdCheckmarkCircleOutline  size={50} />
      })

    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(err.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <AdminCategoryNewCommon formik={formik} />
        <Container className="button-component">
          <ButtonComponent
            formik={formik}
            loading={loading}
            type="submit"
            text="Create"
            style={{borderRadius:"10px", padding:"10px 55px"}}
          >
          </ButtonComponent>
        </Container>
        <Spacer height={20} />
        <Container
          style={{ display: show ? "block" : "none" }}>
          <PropertyKeyNewPage categoryId={categoryId} />
        </Container>
        <Spacer height={20} />
      
      </Form>
    </>
  );
};

export default AdminCategoryNewPage;
