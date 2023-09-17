import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAlert } from "../store/modules/alertSlice";
import { loginAsyncThunk } from "../store/modules/userSlice";
import "../styles/animation/inputAnimation.css";
import LoadingAnimation from "./LoadingAnimation";

const schemaLogin = z.object({
  email: z.string().email("E-mail invalido"),
  password: z.string().min(6, "Senha menor que 6 dígitos"),
});

type TLogin = z.infer<typeof schemaLogin>;

export default function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { msg, show } = useAppSelector((state) => state.alert);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(schemaLogin),
  });
  useEffect(() => {
    dispatch(closeAlert());
  }, []);
  useEffect(() => {
    if (user.id) {
      return navigate("/home");
    }
  }, [user]);

  const onSubmit: SubmitHandler<TLogin> = (data: {
    email: string;
    password: string;
  }) => {
    dispatch(loginAsyncThunk(data));
    dispatch(closeAlert());
  };

  return (
    <>
      {user.loading ? <LoadingAnimation /> : ""}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Acessar mural de recados
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
            <div className="relative ">
              {show && (
                <span
                  className=" w-full block text-red-500 "
                  style={{ top: "-30px" }}
                >
                  {msg}
                </span>
              )}
              {errors.email && (
                <span
                  className=" w-full block text-red-500"
                  style={{ top: "-30px" }}
                >
                  {errors.email.message}
                </span>
              )}
              {errors.password && (
                <span
                  className=" w-full block text-red-500"
                  style={{ top: "-30px" }}
                >
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="form-control flex items-center justify-between">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 bg-transparent"
                {...register("email")}
              />{" "}
              <label>
                <span style={{ transitionDelay: "300ms" }}>E</span>
                <span style={{ transitionDelay: "250ms" }}>-</span>
                <span style={{ transitionDelay: "200ms" }}>m</span>
                <span style={{ transitionDelay: "150ms" }}>a</span>
                <span style={{ transitionDelay: "50ms" }}>i</span>
                <span style={{ transitionDelay: "0ms" }}>l</span>
              </label>
            </div>

            <div className="form-control flex items-center justify-between">
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 bg-transparent"
                {...register("password")}
              />{" "}
              <label>
                <span style={{ transitionDelay: "200ms" }}>S</span>
                <span style={{ transitionDelay: "150ms" }}>e</span>
                <span style={{ transitionDelay: "100ms" }}>n</span>
                <span style={{ transitionDelay: "50ms" }}>h</span>
                <span style={{ transitionDelay: "0ms" }}>a</span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                disabled={user.loading ? true : false}
                className="flex w-full justify-center rounded-md bg-gray-900 hover:rgb(173, 216, 230 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {user.loading ? "Carregando..." : "Conectar"}
              </button>
            </div>
          </form>
        </div>
        <p className="mt-10 text-center text-sm text-white-500">
          Não possui conta?{" "}
          <Link
            to="/singup"
            className="font-semibold leading-6 text-yellow-50  hover:text-yellow-200"
          >
            Cadastre-se Agora!
          </Link>
        </p>
      </div>
    </>
  );
}
