"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Le nom d'utilisateur doit avoir au moins 2 caractères",
    })
    .max(25, {
      message: "le nom d'utilisateur doit avoir maximum 25 caractères",
    }),
  usermail: z.string().email({ message: "adresse mail invalide" }),
});

export function ProfileForm() {
  //Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      usermail: "",
    },
  });

  //Define the submit handler (à voir avec Prisma/postgreSQL)
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <hr className="mt-8"></hr>
      <h2 className="text-2xl titre pt-4 pb-4">Inscris-toi a ma newsletter</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="nom d'utilisateur" {...field} />
                </FormControl>
                <FormDescription>
                  Ton prénom pour que je puisse personnaliser ton message.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usermail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="exemple@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Adresse à laquelle tu souhaites recevoir de mes nouvelles.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Envoyer</Button>
        </form>
      </Form>
    </div>
  );
}