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

type EnquiryProps = {
  image: string;
  cardTitle: string;
  cardDescription: string;
  btnText: string;
  btnUrl: string;
};

// Schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const OurEnquiryFormSection: React.FC<EnquiryProps> = ({
  image,
  cardTitle,
  cardDescription,
  btnText,
  btnUrl,
}) => {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Values:", values);
    // You can send API request here
  }

  const [isOther, setIsOther] = useState(false);

  return (
    <article className="relative py-20 after:content-[''] after:absolute after:top-[10%] sm:after:top-0 after:bottom-0 after:right-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[75vw] z-0 after:-z-10">
      <div className="absolute top-0 sm:top-[30%] sm:left-0 right-0 w-[55vw] sm:w-[25vw] h-[300px] sm:h-[600px]">
        <Image fill src={image} alt="" objectFit="cover" />
      </div>
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="grid grid-cols-1 gap-6 sm:gap-0 sm:grid-cols-[40%_60%]">
          <div className="relative sm:pb-15 w-3/5 sm:w-auto sm:max-w-xl text-left mb-30 sm:mb-0">
            <CardBlueBoxSection
              mainClassNames="px-5 sm:px-20 py-10 max-w-xl bg-[rgba(11,104,255,0.92)]"
              headingClassNames="font-bold text-xl sm:text-7xl mb-0 sm:mb-5"
              discriptionClassNames="mb-4"
              cardData={{
                cardTitle,
                cardDescription,
                btnText,
                btnUrl,
              }}
            />
          </div>
          <div className="max-w-2xl sm:pl-20 font-inter">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="flex h-16 w-full rounded-none border border-gray-300 bg-transparent px-3 py-2 text-sm sm:text-lg placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Email ID *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="flex h-16 w-full rounded-none border border-gray-300 bg-transparent px-3 py-2 text-sm sm:text-lg placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="flex h-16 w-full rounded-none border border-gray-300 bg-transparent px-3 py-2 text-sm sm:text-lg placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Company *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="flex h-16 w-full rounded-none border border-gray-300 bg-transparent px-3 py-2 text-sm sm:text-lg placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="flex min-h-[150px] w-full rounded-none border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            // ref={ref}
                            // {...props}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="font-medium text-sm sm:text-xl">
                          How did you hear about us?
                        </FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                className="w-8 h-8 rounded-none border-black"
                                id="searchEngine"
                              />
                              <Label
                                className="text-sm sm:text-xl"
                                htmlFor="searchEngine"
                              >
                                Search Engine
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                className="w-8 h-8 rounded-none border-black"
                                id="socialMedia"
                              />
                              <Label
                                className="text-sm sm:text-xl"
                                htmlFor="socialMedia"
                              >
                                Social Media
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                className="w-8 h-8 rounded-none border-black"
                                id="referral"
                              />
                              <Label
                                className="text-sm sm:text-xl"
                                htmlFor="referral"
                              >
                                Referral
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                className="w-8 h-8 rounded-none border-black"
                                id="advertisement"
                              />
                              <Label
                                className="text-sm sm:text-xl"
                                htmlFor="advertisement"
                              >
                                Advertisement
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                className="w-8 h-8 rounded-none border-black"
                                id="others"
                                checked={isOther}
                                onCheckedChange={(val) => setIsOther(!!val)}
                              />
                              <Label
                                className="text-sm sm:text-xl"
                                htmlFor="others"
                              >
                                Other
                              </Label>
                              {isOther && (
                                <Input
                                  className="border-b border-black border-0 focus-visible:ring-0"
                                  type="text"
                                  placeholder="If other please specify"
                                />
                              )}
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              className="w-6 h-6 rounded-none border-black"
                              id="searchEngine"
                            />
                            <Label
                              className="text-xs sm:text-base"
                              htmlFor="searchEngine"
                            >
                              I authorize IceApple to collect and use the
                              personal information I have provided above to
                              contact me and respond to my inquiry.
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
                <Button
                  className="rounded-none text-xl py-8 px-16 bg-[#002656]"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurEnquiryFormSection;
