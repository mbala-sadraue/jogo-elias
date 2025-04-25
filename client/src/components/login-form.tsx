import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// Temporarily disabled: import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "O nome de usuário deve ter pelo menos 3 caracteres.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  // Temporarily disabled auth
  // const { loginMutation } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: LoginFormValues) {
    // Temporarily disabled auth
    setIsPending(true);
    console.log("Login form submitted", values);
    setTimeout(() => {
      setIsPending(false);
    }, 1000);
    // loginMutation.mutate({
    //   username: values.username,
    //   password: values.password,
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nome de Usuário
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="seu.usuario"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:text-light"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:text-light"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rememberMe" 
              checked={rememberMe}
              onCheckedChange={() => setRememberMe(!rememberMe)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            >
              Lembrar de mim
            </label>
          </div>

          <a href="#" className="text-sm text-primary ml-auto">
            Esqueceu a senha?
          </a>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-6 px-4 rounded-lg transition duration-200 flex items-center justify-center h-12"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : null}
          Entrar
        </Button>
      </form>
    </Form>
  );
}
