import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/schemas/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signup } from "@/api/auth";

type SignupFormData = z.infer<typeof createUserSchema>;

const PHONE_TYPES = ["Mobile", "Home", "Work"] as const;

const SignupPage = () => {
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      address: {
        area: "",
        street: "",
        number: "",
        po: "",
      },
      phone: [{ type: "Mobile", number: "" }],
      roles: ["PATIENT"],
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const payload = {
        ...data,
        roles: ["PATIENT"],
      };

      await signup(payload);
      toast.success(`User ${payload.username} created successfully`);
      form.reset();
      navigate("/auth/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    }
  };

  const onCancel = () => {
    form.reset();
  };

  return (
    <>
      <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Signup</h1>

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

        
        <div>
          <label className="block mb-1">Firstname</label>
          <Input {...form.register("firstname")} placeholder="Enter Firstname" />
        </div>

        
        <div>
          <label className="block mb-1">Lastname</label>
          <Input {...form.register("lastname")} placeholder="Enter Lastname" />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Input {...form.register("email")} placeholder="Enter Email" />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold">Address</h2>

          <Input {...form.register("address.area")} placeholder="Enter Area" />
          <Input {...form.register("address.street")} placeholder="Enter Street" />
          <Input {...form.register("address.number")} placeholder="Enter Number" />
          <Input {...form.register("address.po")} placeholder="Enter Postal Code" />
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold">Phone</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <select
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
              {...form.register("phone.0.type")}
            >
              {PHONE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="flex-1">
              <Input
                type="tel"
                {...form.register("phone.0.number")}
                placeholder="Enter Phone number"
              />
              {form.formState.errors.phone?.[0]?.number && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.phone[0]?.number?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
    </>
  )
    
    
};

export default SignupPage;
