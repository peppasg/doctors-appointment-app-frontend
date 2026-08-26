import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { loginSchema, type LoginFields } from "@/schemas/auth";

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFields) => {
    try {
      const res = await loginUser(data);
      toast.success(`Welcome ${data.username}`);

      if (res.role) {
        navigate("/user/specialties");
      }
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <div className="p-6 max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <Input {...form.register("username")} placeholder="Enter username" />
            {form.formState.errors.username && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <Input
              type="password"
              {...form.register("password")}
              placeholder="Enter password"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="font-medium text-primary underline-offset-4 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
