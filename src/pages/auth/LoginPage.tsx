import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { type LoginFields } from "@/types/auth";
import { loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFields) => {
    try {
      await loginUser(data);
      toast.success("Login successful");
      navigate("/patient/specialties");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm mx-auto p-8 space-y-6 border rounded bg-white shadow"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" {...register("username")} />
          {errors.username && (
              <div className="text-red-600 text-sm">{errors.username.message}</div>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
              <div className="text-red-600 text-sm">{errors.password.message}</div>
          )}
        </Field>
        <Button type="submit" className="w-full">
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        {/* Extra section κάτω από το κουμπί */}
        <div className="text-center text-sm mt-4">
          <span>Don't have already an account? </span>
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
  );
};

export default LoginPage;
