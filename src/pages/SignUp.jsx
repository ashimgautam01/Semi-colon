import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../services/auth";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-r from-teal-100 to-teal-200">
      <div className="z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white bg-opacity-80 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 backdrop-blur-lg border border-teal-300"
        >
          <h2 className="text-4xl font-bold text-teal-900 mb-6 text-center">
            Sign Up for Trekking Adventures
          </h2>

          <div className="mb-4">
            <label
              className="block text-teal-800 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">
                  Please enter a username
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-teal-800 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
          </div>

          <div className="mb-6">
            <label
              className="block text-teal-800 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 15,
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-5 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign Up
            </Button>
            <Link
              to="/login"
              className="inline-block align-baseline font-semibold text-sm text-teal-600 hover:text-teal-800"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
