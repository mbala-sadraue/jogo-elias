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

const registerSchema = z.object({
  username: z.string().min(3, {
    message: "O nome de usuário deve ter pelo menos 3 caracteres.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos e condições."
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  // Temporarily disabled: const { registerMutation } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false
    },
  });

  function onSubmit(values: RegisterFormValues) {
    // Temporarily disabled auth
    setIsPending(true);
    console.log("Register form submitted", values);
    setTimeout(() => {
      setIsPending(false);
    }, 1000);
    // registerMutation.mutate({
    //   username: values.username,
    //   password: values.password,
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  placeholder="Crie uma senha forte"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirmar Senha
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
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
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-gray-600 dark:text-gray-400">
                  Eu concordo com os <a href="#" className="text-primary">Termos de Serviço</a> e <a href="#" className="text-primary">Política de Privacidade</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-6 px-4 rounded-lg transition duration-200 flex items-center justify-center h-12"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : null}
          Criar Conta
        </Button>
      </form>
    </Form>
  );
}
