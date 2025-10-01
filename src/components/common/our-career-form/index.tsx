"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import CardBlueBoxSection from "@/components/common/card-with-blue";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useDeviceType } from "../../../../hooks/useDeviceType";

// ----------------- Props type -----------------
type CareerFormProps = {
  image: string;
  cardTitle: string;
  cardDescription: string;
  btnText: string;
  btnUrl: string;
};

// ----------------- Zod schema -----------------
const careerSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone is too short" })
    .max(15, { message: "Phone is too long" })
    .regex(/^[0-9]+$/, "Digits only"),
  linkedIn: z.string().url({ message: "Valid LinkedIn URL required" }),
  resume: z.instanceof(File, { message: "Resume file is required" }),
  authorize: z.boolean().refine((val) => val === true, {
    message: "Authorization required",
  }),
});

type CareerFormValues = z.infer<typeof careerSchema>;

// ----------------- Component -----------------
const OurCareerFormSection: React.FC<CareerFormProps> = ({
  image,
  cardTitle,
  cardDescription,
  btnText,
  btnUrl,
}) => {
  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedIn: "",
      resume: undefined,
      authorize: false,
    },
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const deviceType = useDeviceType();

  const onSubmit = async (values: CareerFormValues) => {
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("linkedIn", values.linkedIn);
      formData.append("authorize", values.authorize.toString());

      if (values.resume) {
        formData.append("resume", values.resume);
      }

      const res = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus({ type: "success", message: data.message });
        form.reset();
        const fileInput =
          document.querySelector<HTMLInputElement>('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Submission failed",
        });
      }

      setTimeout(() => setSubmitStatus(null), 60000);
    } catch (err) {
      console.error(err);
      setSubmitStatus({ type: "error", message: "Something went wrong!" });
      setTimeout(() => setSubmitStatus(null), 60000);
    }
  };

  return (
    <article className="relative py-20 after:content-[''] after:absolute after:top-[10%] sm:after:top-0 after:bottom-0 after:right-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[75vw] z-0 after:-z-10">
      {/* Image */}
      <div className="absolute top-0 sm:top-[30%] sm:left-0 right-0 w-[55vw] sm:w-[25vw] h-[300px] sm:h-[600px]">
        <Image fill src={image} alt="" className="object-cover" />
      </div>

      {/* Container */}
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[40%_60%]">
          {/* Card */}
          <div className="relative sm:pb-15 w-3/5 sm:w-auto sm:max-w-xl text-left mb-22 sm:mb-0">
            <CardBlueBoxSection
              mainClassNames="px-5 sm:px-20 py-10 max-w-xl bg-[rgba(11,104,255,0.92)]"
              headingClassNames="font-bold text-xl sm:text-7xl mb-0 sm:mb-5"
              discriptionClassNames="mb-4"
              cardData={{ cardTitle, cardDescription, btnText, btnUrl }}
              cardDescriptionMobile={true}
            />
          </div>

          {deviceType === "mobile" && (
            <p className="text-sm font-inter">{cardDescription}</p>
          )}

          {/* Form */}
          <div className="max-w-2xl sm:pl-20 font-inter">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your name"
                          className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        Email ID *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your phone number"
                          className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn */}
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        LinkedIn Profile *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Paste LinkedIn URL"
                          className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Resume */}
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { onChange, ref }, fieldState }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        Resume Upload *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            const maxSize = 30 * 1024 * 1024; // 30 MB

                            if (file) {
                              if (file.size > maxSize) {
                                onChange(undefined); // Clear invalid file
                                form.setError("resume", {
                                  type: "manual",
                                  message:
                                    "File too large. Maximum allowed size is 30 MB.",
                                });
                                e.target.value = ""; // reset input so user can pick again
                              } else {
                                onChange(file); // valid file
                                form.clearErrors("resume"); // clear previous error if any
                              }
                            } else {
                              onChange(undefined); // if no file selected
                              form.clearErrors("resume");
                            }
                          }}
                          ref={ref}
                          className="h-16 w-full rounded-none border border-gray-300 px-3 py-2"
                        />
                      </FormControl>
                      <FormMessage>{fieldState?.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Authorization */}
                <FormField
                  control={form.control}
                  name="authorize"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          ref={field.ref}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs sm:text-base">
                          I authorize IceApple to collect and use my info for
                          this application.
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="rounded-none text-xl py-4 px-8 bg-[#002656] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!form.formState.isValid}
                >
                  Submit
                </Button>

                {submitStatus && (
                  <div
                    className={`p-3 mt-2 rounded ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurCareerFormSection;
