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
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useDeviceType } from "../../../../hooks/useDeviceType";

// Props type
type EnquiryProps = {
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

// Zod schema
const formSchema = z
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
    company: z
      .string()
      .max(100, { message: "Company name must not exceed 100 characters." })
      .optional(),
    message: z
      .string()
      .max(500, { message: "Message must not exceed 500 characters." })
      .optional(),
    heardAboutUs: z.array(z.string()).optional(),
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

const OurEnquiryFormSection: React.FC<EnquiryProps> = ({
  image,
  cardTitle,
  cardDescription,
  btnText,
  btnUrl,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      company: "",
      message: "",
      heardAboutUs: [],
      authorize: false,
    },
  });

  const [isOther, setIsOther] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const deviceType = useDeviceType();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitStatus(null);
    try {
      // Combine country code and phone number for API submission
      const submissionData = {
        ...values,
        phone: `${values.countryCode} ${values.phone}`,
        countryCode: undefined, // Remove separate countryCode field
      };

      const res = await fetch("/api/client", {
        method: "POST",
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Details submitted successfully!",
        });
        form.reset();
        form.clearErrors();
        setIsOther(false);
        setOtherInputValue("");
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to submit form",
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ type: "error", message: "Something went wrong!" });
    }
  };

  return (
    <article className="relative py-20 after:content-[''] after:absolute after:top-[10%] sm:after:top-0 after:bottom-0 after:right-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[75vw] z-0 after:-z-10">
      {/* Image */}
      <div className="absolute top-0 sm:top-[30%] sm:left-0 right-0 w-[55vw] sm:w-[25vw] h-[300px] sm:h-[600px]">
        <Image fill src={image} alt="" className="object-cover" />
      </div>

      {/* Form container */}
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="grid grid-cols-1 gap-6 sm:gap-0 sm:grid-cols-[40%_60%]">
          {/* Card section */}
          <div className="relative sm:pb-15 w-3/5 sm:w-auto sm:max-w-xl text-left mb-22 sm:mb-0">
            <CardBlueBoxSection
              mainClassNames="px-5 sm:px-20 py-10 max-w-xl bg-[rgba(11,104,255,0.92)]"
              headingClassNames="font-bold text-xl sm:text-5xl xl:text-7xl mb-0 sm:mb-5"
              discriptionClassNames="mb-4"
              cardDescriptionMobile={true}
              cardData={{
                cardTitle,
                cardDescription,
                btnText,
                btnUrl,
              }}
            />
          </div>

          {deviceType === "mobile" && (
            <p className="text-sm font-inter">{cardDescription}</p>
          )}

          {/* Form section */}
          <div className="max-w-2xl sm:pl-20 font-inter">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Username */}
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
                            <p className={`text-xs ${isAtLimit ? 'text-red-600 font-semibold' : 'text-orange-600'}`}>
                              {isAtLimit ? 'Maximum character limit reached' : `${currentLength}/${maxLength} characters`}
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
                            <p className={`text-xs ${isAtLimit ? 'text-red-600 font-semibold' : 'text-orange-600'}`}>
                              {isAtLimit ? 'Maximum character limit reached' : `${currentLength}/${maxLength} characters`}
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
                                <span className="text-sm sm:text-lg">{field.value}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                  <path fill="#333" d="M6 9L1 4h10z"/>
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

                {/* Company */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => {
                    const maxLength = 100;
                    const currentLength = field.value?.length || 0;
                    const isNearLimit = currentLength >= maxLength * 0.9;
                    const isAtLimit = currentLength >= maxLength;

                    return (
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Company
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your company"
                            maxLength={maxLength}
                            className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          {isNearLimit && (
                            <p className={`text-xs ${isAtLimit ? 'text-red-600 font-semibold' : 'text-orange-600'}`}>
                              {isAtLimit ? 'Maximum character limit reached' : `${currentLength}/${maxLength} characters`}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => {
                    const maxLength = 500;
                    const currentLength = field.value?.length || 0;
                    const isNearLimit = currentLength >= maxLength * 0.9;
                    const isAtLimit = currentLength >= maxLength;

                    return (
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter your message"
                            maxLength={maxLength}
                            className="w-full min-h-[150px] rounded-none border border-gray-300 px-3 py-2 text-sm"
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          {isNearLimit && (
                            <p className={`text-xs ${isAtLimit ? 'text-red-600 font-semibold' : 'text-orange-600'}`}>
                              {isAtLimit ? 'Maximum character limit reached' : `${currentLength}/${maxLength} characters`}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                {/* Heard About Us */}
                <FormField
                  control={form.control}
                  name="heardAboutUs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        How did you hear about us?
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
                          {[
                            "searchEngine",
                            "socialMedia",
                            "referral",
                            "advertisement",
                          ].map((option) => (
                            <div
                              key={option}
                              className="flex items-center gap-3"
                            >
                              <Checkbox
                                checked={field.value?.includes(option) || false}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value || []), option]
                                    : (field.value || []).filter(
                                        (v) => v !== option
                                      );
                                  field.onChange(newValue);
                                }}
                                className="w-6 h-6 rounded-none border-black"
                              />
                              <Label className="text-sm sm:text-lg">
                                {option === "searchEngine"
                                  ? "Search Engine"
                                  : option === "socialMedia"
                                  ? "Social Media"
                                  : option === "referral"
                                  ? "Referral"
                                  : "Advertisement"}
                              </Label>
                            </div>
                          ))}

                          {/* Other option */}
                          <div className="flex flex-col gap-2 sm:col-span-2">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={isOther}
                                onCheckedChange={(val) => {
                                  setIsOther(!!val);
                                  if (!val) {
                                    setOtherInputValue("");
                                    field.onChange(
                                      (field.value || []).filter(
                                        (v) => !v.startsWith("other:")
                                      )
                                    );
                                  } else {
                                    if (
                                      !(field.value || []).some((v) =>
                                        v.startsWith("other:")
                                      )
                                    ) {
                                      field.onChange([
                                        ...(field.value || []),
                                        "other:",
                                      ]);
                                    }
                                  }
                                }}
                                className="w-6 h-6 rounded-none border-black"
                              />
                              <Label className="text-sm sm:text-lg">Other</Label>
                            </div>
                            {isOther && (
                              <div className="ml-9 space-y-1">
                                <Input
                                  type="text"
                                  placeholder="If other, please specify"
                                  maxLength={50}
                                  value={otherInputValue}
                                  className="border-b border-black focus-visible:ring-0"
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setOtherInputValue(val);
                                    const cleaned = (field.value || []).filter(
                                      (v) => !v.startsWith("other:")
                                    );
                                    field.onChange(
                                      val.trim() ? [...cleaned, `other:${val.trim()}`] : cleaned
                                    );
                                  }}
                                />
                                {otherInputValue.length >= 45 && (
                                  <p className={`text-xs ${otherInputValue.length >= 50 ? 'text-red-600 font-semibold' : 'text-orange-600'}`}>
                                    {otherInputValue.length >= 50 ? 'Maximum character limit reached' : `${otherInputValue.length}/50 characters`}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </FormControl>
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
                            information I have provided above to contact me and
                            respond to my inquiry.
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

                {/* Submit status */}
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

export default OurEnquiryFormSection;
