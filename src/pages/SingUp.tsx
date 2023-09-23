import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAlert } from "../store/modules/alertSlice";
import { singUpAsyncThunk } from "../store/modules/userSlice";
import "../styles/animation/inputAnimation.css";
import { TCreateAccount, schemaCreateAccount } from "../types/ZTypes";

export default function SingUp() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  const { msg, type } = useAppSelector(({ alert }) => alert);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(closeAlert());
  }, []);

  useEffect(() => {
    if (user.id) {
      navigate("/home");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateAccount>({
    resolver: zodResolver(schemaCreateAccount),
  });

  useEffect(() => {
    if (type === "success") return reset();
  }, [type]);

  const onSubmit = (data: TCreateAccount) => {
    dispatch(singUpAsyncThunk(data));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie sua Conta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative ">
              {type === "error" && (
                <span
                  className=" w-full block text-red-500 "
                  style={{ top: "-30px" }}
                >
                  {msg}
                </span>
              )}
              {type === "success" && (
                <span
                  className=" w-full block text-green-500 "
                  style={{ top: "-30px" }}
                >
                  {msg}
                </span>
              )}
              {errors.name && (
                <span
                  className="absolute w-full block text-red-500"
                  style={{ top: "-30px" }}
                >
                  {errors.name.message}
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
              {errors.rePassword && (
                <span
                  className=" w-full block text-red-500"
                  style={{ top: "-30px" }}
                >
                  {errors.rePassword.message}
                </span>
              )}
            </div>
            <div className="form-control flex items-center justify-between">
              <input
                id="name"
                type="text"
                required
                autoComplete="text"
                className="block w-full rounded-md border-0 py-1.5 bg-transparent"
                {...register("name")}
              />{" "}
              <label>
                <span style={{ transitionDelay: "200ms" }}>N</span>
                <span style={{ transitionDelay: "150ms" }}>o</span>
                <span style={{ transitionDelay: "50ms" }}>m</span>
                <span style={{ transitionDelay: "0ms" }}>e</span>
              </label>
            </div>
            <div className="form-control flex items-center justify-between">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className=" block w-full rounded-md border-0 py-1.5 bg-transparent"
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
            <div className="form-control flex items-center justify-between">
              <input
                id="rePassword"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 bg-transparent"
                {...register("rePassword")}
              />{" "}
              <label>
                <span style={{ transitionDelay: "750ms" }}>C</span>
                <span style={{ transitionDelay: "700ms" }}>o</span>
                <span style={{ transitionDelay: "650ms" }}>n</span>
                <span style={{ transitionDelay: "600ms" }}>f</span>
                <span style={{ transitionDelay: "550ms" }}>i</span>
                <span style={{ transitionDelay: "500ms" }}>r</span>
                <span style={{ transitionDelay: "450ms" }}>m</span>
                <span style={{ transitionDelay: "400ms" }}>e</span>
                <span style={{ transitionDelay: "350ms" }}></span>
                <span style={{ transitionDelay: "300ms" }}>a</span>
                <span style={{ transitionDelay: "250ms" }}></span>
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
                className="flex w-full justify-center rounded-md bg-gray-900 hover:rgb(173, 216, 230 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {user.loading ? "Criando..." : "CRIAR CONTA"}
              </button>
            </div>
          </form>
        </div>
        <p className="mt-10 text-center text-sm text-white-500">
          Já possui conta?{" "}
          <Link
            to="/"
            className="font-semibold leading-6 text-yellow-50  hover:text-yellow-200"
          >
            Faça seu login.
          </Link>
        </p>
      </div>
    </>
  );
}
