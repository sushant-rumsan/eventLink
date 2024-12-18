"use client";

import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Step, Stepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { useWriteProjectCreateEvent } from "@/hooks/contracts/generated/project";
import { useToast } from "@/hooks/use-toast";
import { EVENT_MANAGER_ADDRESS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, LockIcon, MapPinIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { keccak256, toBytes } from "viem";

type EventFormData = {
  name: string;
  location: string;
  date: string;
  description: string;
  secretCode: string;
};

const formSteps = [
  "Event Details",
  "Date & Location",
  "Secret Code",
  "Preview",
];

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { writeContract, isPending, isSuccess } = useWriteProjectCreateEvent();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EventFormData>();

  const watchAllFields = watch();

  const onSubmit = async (data: EventFormData) => {
    const hash = keccak256(toBytes(data.secretCode));
    const args = [
      data.name.toLowerCase().replace(/\s/g, "-") + data.date,
      data.name,
      data.location,
      data.date,
      data.description,
      hash,
    ];
    if (writeContract) {
      writeContract({
        address: EVENT_MANAGER_ADDRESS,
        //@ts-ignore
        args,
      });
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Event Created",
        description: "Your event has been successfully created!",
      });
      router.push("/");
    }
  }, [isSuccess, toast, router]);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className='w-full bg-card'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text'>
            Create a New Event
          </CardTitle>
          <p className='text-center text-muted-foreground'>
            Fill out the details to publish your event to the blockchain.
          </p>
        </CardHeader>
        <CardContent>
          <Stepper currentStep={currentStep} className='mb-8'>
            {formSteps.map((step, index) => (
              <Step key={step} title={step} completed={currentStep > index} />
            ))}
          </Stepper>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <AnimatePresence>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}>
                {currentStep === 0 && (
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='name'>Event Name</Label>
                      <Input
                        id='name'
                        {...register("name", {
                          required: "Event name is required",
                        })}
                        placeholder='Enter event name'
                        className='mt-1'
                      />
                      {errors.name && (
                        <p className='text-destructive text-sm mt-1'>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor='description'>Event Description</Label>
                      <Textarea
                        id='description'
                        {...register("description", {
                          required: "Description is required",
                        })}
                        placeholder='Describe your event'
                        className='mt-1'
                      />
                      {errors.description && (
                        <p className='text-destructive text-sm mt-1'>
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='date'>Event Date</Label>
                      <div className='relative mt-1'>
                        <CalendarIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
                        <Input
                          id='date'
                          {...register("date", {
                            required: "Date is required",
                          })}
                          type='date'
                          className='pl-10'
                        />
                      </div>
                      {errors.date && (
                        <p className='text-destructive text-sm mt-1'>
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor='location'>Event Location</Label>
                      <div className='relative mt-1'>
                        <MapPinIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
                        <Input
                          id='location'
                          {...register("location", {
                            required: "Location is required",
                          })}
                          placeholder='Enter event location'
                          className='pl-10'
                        />
                      </div>
                      {errors.location && (
                        <p className='text-destructive text-sm mt-1'>
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <Label htmlFor='secretCode'>Secret Code</Label>
                    <div className='relative mt-1'>
                      <LockIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='secretCode'
                        {...register("secretCode", {
                          required: "Secret code is required",
                        })}
                        type='password'
                        placeholder='Enter secret code'
                        className='pl-10'
                      />
                    </div>
                    {errors.secretCode && (
                      <p className='text-destructive text-sm mt-1'>
                        {errors.secretCode.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStep === 3 && <Preview formData={watchAllFields} />}
              </motion.div>
            </AnimatePresence>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            variant='outline'>
            Previous
          </Button>
          {currentStep < formSteps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button
              type='submit'
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}>
              {isPending ? "Creating..." : "Create Event"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
