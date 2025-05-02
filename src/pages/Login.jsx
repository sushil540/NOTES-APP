// import { useNavigate } from "react-router-dom";
// import axios from "../config/axios";
// import { API_END_POINTS } from "../api";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";

// export default function Login() {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email")
//       .required("Email is required")
//       ,
//     password: Yup.string()
//       .required("Password is required")
//       .test("is-strong", "Password must be strong", value =>
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(value)
//       )
//       .min(8, "Password must be at least 8 characters")      
//   });

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const res = await axios.post(API_END_POINTS.auth.login, values);
//       localStorage.setItem("token", res.data.token);
//       Swal.fire("Success", "Logged in successfully!", "success");
//       navigate("/dashboard");
//     } catch (err) {
//       const errorMsg = err?.response?.data?.message || "Login failed";
//       Swal.fire("Error", errorMsg, "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-sm bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>

//         <Formik 
//           isInitialValid={true}
//           validateOnChange={true}
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           validateOnBlur={true}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="space-y-3">
//               <div>
//                 <Field
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   className="w-full p-2 border rounded"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//               </div>

//               <div>
//                 <Field
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   className="w-full p-2 border rounded"
//                 />
//                 <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//               >
//                 {isSubmitting ? "Logging in..." : "Login"}
//               </button>
//             </Form>
//           )}
//         </Formik>

//         <p className="mt-3 text-sm">
//           Don’t have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { API_END_POINTS } from "../api";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .test("is-strong", "Password must be strong", value =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(value)
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
    reValidateMode:"onBlur"
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(API_END_POINTS.auth.login, data);
      localStorage.setItem("token", res.data.token);
      Swal.fire("Success", "Logged in successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Login failed";
      Swal.fire("Error", errorMsg, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-3 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
