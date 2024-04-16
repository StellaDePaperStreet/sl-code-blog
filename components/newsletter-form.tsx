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

import React, { useState, useEffect } from "react";
import { AlertMailSent, AlertMailNotSent } from "./alert";

//Validation des données entrées via Zod
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
  //1. Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      usermail: "",
    },
  });

  const [isMailSent, setIsMailSent] = useState(false); //gère l'état du composant pour afficher ou pas AlertMailSent
  const [isError, setIsError] = useState(false); //idem mais pour AlertMailNotSent

  //2. Define the handler
  //AU CLIC SUR LE BOUTON "Envoyer" DE MON INSCRIPTION NEWSLETTER
  //Les données du form sont envoyées à l'endpoint API de resend
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.username,
          email: values.usermail,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsMailSent(true); //pour afficher l'AlertMailSent

      setTimeout(() => {
        setIsMailSent(false);
      }, 2000); //masque l'alerte après 2 secondes

      const data = await response.json(); //data n'est pas utilisé ?
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
      // setIsMailSent(false);
    }
  }

  //3. Define the HTML
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
                <FormMessage />
                <p className="italic text-md text-muted-foreground font-light">
                  <br />
                  Tu recevras un e-mail de ma part uniquement lorsque je
                  publierai un nouvel article :)
                </p>
              </FormItem>
            )}
          />
          <Button type="submit" className="dark:hover:bg-[#FFFCDB] w-full">
            Envoyer
          </Button>
        </form>
      </Form>
      <div className="mb-4">{isMailSent && <AlertMailSent />}</div>
      <div className="mb-4">{isError && <AlertMailNotSent />}</div>
    </div>
  );
}
