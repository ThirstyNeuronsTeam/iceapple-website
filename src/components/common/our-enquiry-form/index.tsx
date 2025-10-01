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

// Zod schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number can't exceed 15 digits" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  company: z.string().optional(),
  message: z.string().optional(),
  heardAboutUs: z.array(z.string()).optional(),
  authorize: z.boolean().refine((val) => val === true, {
    message: "Authorization required",
  }),
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
      phone: "",
      company: "",
      message: "",
      heardAboutUs: [],
      authorize: false,
    },
  });

  const [isOther, setIsOther] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const deviceType = useDeviceType();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitStatus(null);
    try {
      const res = await fetch("/api/client", {
        method: "POST",
        body: JSON.stringify(values),
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
              headingClassNames="font-bold text-xl sm:text-7xl mb-0 sm:mb-5"
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

                {/* Company */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your company"
                          className="h-16 w-full rounded-none border border-gray-300 px-3 py-2 text-sm sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm sm:text-xl">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter your message"
                          className="w-full min-h-[150px] rounded-none border border-gray-300 px-3 py-2 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={isOther}
                              onCheckedChange={(val) => {
                                setIsOther(!!val);
                                if (!val) {
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
                            {isOther && (
                              <Input
                                type="text"
                                placeholder="If other, please specify"
                                className="border-b border-black focus-visible:ring-0"
                                onChange={(e) => {
                                  const val = e.target.value.trim();
                                  const cleaned = (field.value || []).filter(
                                    (v) => !v.startsWith("other:")
                                  );
                                  field.onChange(
                                    val ? [...cleaned, `other:${val}`] : cleaned
                                  );
                                }}
                              />
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
