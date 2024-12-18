"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENT_MANAGER_ABI, EVENT_MANAGER_ADDRESS } from "@/lib/constants";
import { formatDynamicEventData } from "@/lib/data";
import Link from "next/link";
import { useReadContract } from "wagmi";
import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon } from "lucide-react";

export default function EventListPage() {
  const {
    data: events,
    isLoading,
    isError,
  } = useReadContract({
    address: EVENT_MANAGER_ADDRESS,
    abi: EVENT_MANAGER_ABI,
    functionName: "getActiveEvents",
    query: {
      select(data) {
        //@ts-ignore
        return formatDynamicEventData(data) || [];
      },
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className='container mx-auto px-4 py-8'>
      <motion.h1
        className='text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Discover Active Events
      </motion.h1>
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        {events &&
          events.map((event: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}>
              <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105'>
                <CardHeader className='bg-gradient-to-r from-primary/10 to-purple-600/10 p-4'>
                  <CardTitle className='text-xl font-semibold truncate'>
                    {event.name}
                    <p>
                      <span className='text-sm text-muted-foreground'>
                        by {event.creator}
                      </span>
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-4'>
                  <div className='flex items-center mb-2 text-muted-foreground'>
                    <MapPinIcon className='w-4 h-4 mr-2' />
                    <p className='text-sm truncate'>{event.location}</p>
                  </div>
                  <div className='flex items-center mb-4 text-muted-foreground'>
                    <CalendarIcon className='w-4 h-4 mr-2' />
                    <p className='text-sm'>{event.date}</p>
                  </div>
                  <Link
                    href={`/event/${event.slug}?eventData=${JSON.stringify(event)}`}>
                    <Button className='w-full transition-all duration-300 hover:bg-primary/90'>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary'></div>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <p className='text-destructive text-xl'>
        Error loading events. Please try again later.
      </p>
    </div>
  );
}
