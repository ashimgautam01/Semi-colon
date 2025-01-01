import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../services/auth";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      {" "}
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-r from-teal-100 to-teal-200">
        <div className="z-10 w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white bg-opacity-90 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">
              Login to Your Trekking Account
            </h2>
            <div className="mb-4">
              <label
                className="block text-teal-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  Please enter a valid email address
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-teal-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 15,
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  Please enter a valid password
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-teal-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Log In
              </Button>
              <Link
                to={"/signup"}
                className="inline-block align-baseline font-bold text-sm text-teal-600 hover:text-teal-800"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
