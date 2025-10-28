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
import { Label } from "@/components/ui/label";
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

// Popular country codes with their phone number length requirements
const countryCodes = [
  { code: "+91", country: "India", minLength: 10, maxLength: 10 },
  { code: "+1", country: "US/CA", minLength: 10, maxLength: 10 },
  { code: "+44", country: "UK", minLength: 10, maxLength: 10 },
  { code: "+61", country: "Australia", minLength: 9, maxLength: 9 },
  { code: "+86", country: "China", minLength: 11, maxLength: 11 },
  { code: "+81", country: "Japan", minLength: 10, maxLength: 10 },
  { code: "+49", country: "Germany", minLength: 10, maxLength: 11 },
  { code: "+33", country: "France", minLength: 9, maxLength: 9 },
  { code: "+39", country: "Italy", minLength: 9, maxLength: 10 },
  { code: "+34", country: "Spain", minLength: 9, maxLength: 9 },
  { code: "+7", country: "Russia", minLength: 10, maxLength: 10 },
  { code: "+55", country: "Brazil", minLength: 10, maxLength: 11 },
  { code: "+52", country: "Mexico", minLength: 10, maxLength: 10 },
  { code: "+27", country: "South Africa", minLength: 9, maxLength: 9 },
  { code: "+971", country: "UAE", minLength: 9, maxLength: 9 },
  { code: "+65", country: "Singapore", minLength: 8, maxLength: 8 },
  { code: "+82", country: "South Korea", minLength: 9, maxLength: 10 },
  { code: "+31", country: "Netherlands", minLength: 9, maxLength: 9 },
  { code: "+46", country: "Sweden", minLength: 9, maxLength: 10 },
  { code: "+41", country: "Switzerland", minLength: 9, maxLength: 9 },
];

// ----------------- Zod schema -----------------
const careerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must not exceed 50 characters." }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .max(100, { message: "Email must not exceed 100 characters." }),
    countryCode: z
      .string()
      .min(1, { message: "Country code is required" })
      .regex(/^\+[0-9]+$/, { message: "Invalid country code format" }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
    linkedIn: z
      .string()
      .min(1, { message: "LinkedIn profile URL is required" })
      .url({ message: "Must be a valid URL" })
      .regex(/^https?:\/\/(www\.)?linkedin\.com\/.+/i, {
        message: "Must be a LinkedIn URL (linkedin.com)",
      })
      .max(200, { message: "URL must not exceed 200 characters." }),
    resume: z
      .any()
      .refine((val) => typeof File === "undefined" || val instanceof File, {
        message: "Resume file is required",
      })
      .refine(
        (val) => {
          if (typeof File === "undefined" || !(val instanceof File))
            return true;
          const maxSize = 30 * 1024 * 1024; // 30 MB
          return val.size <= maxSize;
        },
        { message: "File size must not exceed 30 MB" }
      )
      .refine(
        (val) => {
          if (typeof File === "undefined" || !(val instanceof File))
            return true;
          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];
          return allowedTypes.includes(val.type);
        },
        { message: "Only PDF, DOC, and DOCX files are allowed" }
      ),
    authorize: z.boolean().refine((val) => val === true, {
      message: "Authorization required",
    }),
  })
  .superRefine((data, ctx) => {
    // Find the country code configuration
    const countryConfig = countryCodes.find((c) => c.code === data.countryCode);
    if (!countryConfig) return; // If country code not found, skip validation

    const phoneLength = data.phone.length;
    const isValid =
      phoneLength >= countryConfig.minLength &&
      phoneLength <= countryConfig.maxLength;

    if (!isValid) {
      const lengthMsg =
        countryConfig.minLength === countryConfig.maxLength
          ? `exactly ${countryConfig.minLength} digits`
          : `${countryConfig.minLength}-${countryConfig.maxLength} digits`;

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Phone number for ${countryConfig.country} must be ${lengthMsg}`,
        path: ["phone"],
      });
    }
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
      countryCode: "+91",
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
      // Combine country code and phone number
      formData.append("phone", `${values.countryCode} ${values.phone}`);
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
        form.clearErrors();
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
      <div className="absolute top-0 sm:top-[30%] sm:left-0 right-0 w-[55vw] sm:w-[25vw] h-[300px] sm:h-[600px] hidden sm:block">
        <Image fill src={image} alt="" className="object-cover" />
      </div>

      {/* Container */}
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[40%_60%] relative">
          <div className="absolute top-[-5%] sm:top-[30%] right-0 sm:left-0 w-[55vw] sm:w-[25vw] h-[300px] sm:h-[600px] sm:hidden">
            <Image fill src={image} alt="" className="object-cover" />
          </div>
          {/* Card */}
          <div className="relative sm:pb-15 w-3/5 sm:w-auto sm:max-w-xl text-left mb-22 sm:mb-0">
            <CardBlueBoxSection
              mainClassNames="px-5 sm:px-20 py-10 max-w-xl bg-[rgba(11,104,255,0.92)]"
              headingClassNames="font-bold text-xl sm:text-3xl xl:text-7xl mb-0 sm:mb-5"
              discriptionClassNames="mb-4"
              cardData={{ cardTitle, cardDescription, btnText, btnUrl }}
              cardDescriptionMobile={true}
            />
          </div>

          {deviceType === "mobile" && (
            <p className="text-sm font-inter mt-10">{cardDescription}</p>
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
                  render={({ field }) => {
                    const maxLength = 50;
                    const currentLength = field.value?.length || 0;
                    const isNearLimit = currentLength >= maxLength * 0.9;
                    const isAtLimit = currentLength >= maxLength;

                    return (
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your name"
                            maxLength={maxLength}
                            className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          {isNearLimit && (
                            <p
                              className={`text-xs ${
                                isAtLimit
                                  ? "text-red-600 font-semibold"
                                  : "text-orange-600"
                              }`}
                            >
                              {isAtLimit
                                ? "Maximum character limit reached"
                                : `${currentLength}/${maxLength} characters`}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    const maxLength = 100;
                    const currentLength = field.value?.length || 0;
                    const isNearLimit = currentLength >= maxLength * 0.9;
                    const isAtLimit = currentLength >= maxLength;

                    return (
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Email ID *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your email"
                            maxLength={maxLength}
                            className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          {isNearLimit && (
                            <p
                              className={`text-xs ${
                                isAtLimit
                                  ? "text-red-600 font-semibold"
                                  : "text-orange-600"
                              }`}
                            >
                              {isAtLimit
                                ? "Maximum character limit reached"
                                : `${currentLength}/${maxLength} characters`}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                {/* Phone Number with Country Code */}
                <div className="space-y-3">
                  <FormLabel className="font-medium text-sm sm:text-xl">
                    Phone Number *
                  </FormLabel>
                  <div className="flex gap-3">
                    {/* Country Code */}
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem className="w-[100px] sm:w-[120px]">
                          <FormControl>
                            <div className="relative">
                              {/* Display selected code only */}
                              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none h-16 border border-gray-300 bg-white">
                                <span className="text-sm sm:text-lg">
                                  {field.value}
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                >
                                  <path fill="#333" d="M6 9L1 4h10z" />
                                </svg>
                              </div>
                              {/* Hidden select with full options */}
                              <select
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  // Trigger revalidation of phone field when country code changes
                                  if (form.getValues("phone")) {
                                    form.trigger("phone");
                                  }
                                }}
                                className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer opacity-0"
                              >
                                {countryCodes.map((item) => (
                                  <option key={item.code} value={item.code}>
                                    {item.code} ({item.country})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => {
                        const selectedCountry = countryCodes.find(
                          (c) => c.code === form.watch("countryCode")
                        );
                        const maxLength = selectedCountry?.maxLength || 15;

                        return (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your phone number"
                                maxLength={maxLength}
                                className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => {
                    const maxLength = 200;
                    const currentLength = field.value?.length || 0;
                    const isNearLimit = currentLength >= maxLength * 0.9;
                    const isAtLimit = currentLength >= maxLength;

                    return (
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          LinkedIn Profile *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://www.linkedin.com/in/your-profile"
                            maxLength={maxLength}
                            className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          {isNearLimit && (
                            <p
                              className={`text-xs ${
                                isAtLimit
                                  ? "text-red-600 font-semibold"
                                  : "text-orange-600"
                              }`}
                            >
                              {isAtLimit
                                ? "Maximum character limit reached"
                                : `${currentLength}/${maxLength} characters`}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                {/* Resume */}
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { onChange, ref, value }, fieldState }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        Resume Upload *
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
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
                              }
                            }}
                            ref={ref}
                            className="h-16 w-full rounded-none border border-gray-300 px-3 py-2"
                          />
                          {value instanceof File && (
                            <p className="text-xs text-gray-600">
                              Selected: {value.name} (
                              {(value.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            Accepted formats: PDF, DOC, DOCX (Max 30 MB)
                          </p>
                        </div>
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
                    <FormItem>
                      <FormControl>
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(val) => field.onChange(!!val)}
                            className="w-6 h-6 rounded-none border-black"
                          />
                          <Label className="text-xs sm:text-base">
                            I authorize IceApple to collect and use the personal
                            information I have provided above for this job
                            application and to contact me regarding employment
                            opportunities.
                          </Label>
                        </div>
                      </FormControl>
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
