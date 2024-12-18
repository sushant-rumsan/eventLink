"use client";

import { useAccount } from "wagmi";
import { EVENT_MANAGER_ADDRESS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  useReadProjectGetActiveEvents,
  useReadProjectGetJoinedEvents,
  useReadProjectUsernamesByWallet,
  useWriteProjectCreateUsername,
} from "@/hooks/contracts/generated/project";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDynamicEventData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { address } = useAccount();
  const [username, setUsername] = useState("");

  const { data: createdEvents } = useReadProjectGetActiveEvents({
    address: EVENT_MANAGER_ADDRESS,
    query: {
      select(data) {
        const formattedData = formatDynamicEventData(data);
        return (
          formattedData.filter((event: any) => event?.creator === address) || []
        );
      },
    },
  });

  const { data: joinedEvents } = useReadProjectGetJoinedEvents({
    address: EVENT_MANAGER_ADDRESS,
    args: [address],
    query: {
      select(data) {
        return data; // return formatDynamicEventData(data);
      },
    },
  });

  const { data: joinedEventsFiltered } = useReadProjectGetActiveEvents({
    address: EVENT_MANAGER_ADDRESS,
    query: {
      enabled: !!joinedEvents?.length,
      select(data) {
        // Filter joined events
        const joinedEventMap = new Map(
          joinedEvents.map((event: any) => [event.eventId, event.isApproved])
        );

        // Format and filter active events
        const formattedData = formatDynamicEventData(data);
        return formattedData
          .filter((event: any) => joinedEventMap.has(event.slug))
          .map((event: any) => ({
            ...event,
            isApproved: joinedEventMap.get(event.slug),
          }));
      },
    },
  });

  console.log("joinedEvents", { joinedEvents, joinedEventsFiltered });

  console.log("joinedEvents", { joinedEvents, joinedEventsFiltered });
  const { data: createdUsername } = useReadProjectUsernamesByWallet({
    address: EVENT_MANAGER_ADDRESS,
    args: [address],
  });

  const { writeContractAsync: createUsername, isPending: creatingUsername } =
    useWriteProjectCreateUsername();

  const handleCreateUsername = async () => {
    if (username) {
      try {
        await createUsername({
          account: address,
          args: [username],
          address: EVENT_MANAGER_ADDRESS,
        });
      } catch (error) {
        console.error("Error creating username:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='container mx-auto px-4 py-8'>
      <motion.h1
        className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text'
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}>
        User Profile
      </motion.h1>

      <Card className='mb-8'>
        <CardContent className='pt-6'>
          <div className='flex items-center space-x-4'>
            <Avatar className='w-20 h-20'>
              <AvatarFallback>
                {createdUsername ? createdUsername[0].toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-2xl font-semibold mb-2'>
                {createdUsername || "Set Your Username"}
              </h2>
              <p className='text-sm text-muted-foreground break-all'>
                {address}
              </p>
            </div>
          </div>
          {!createdUsername && (
            <div className='mt-4 flex items-center space-x-2'>
              <Input
                type='text'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='flex-grow'
              />
              <Button
                onClick={handleCreateUsername}
                disabled={!username || creatingUsername}>
                {creatingUsername ? "Setting..." : "Set Username"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 className='text-2xl font-bold mb-4'>Created Events</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {createdEvents &&
            createdEvents.map((event: any, index: number) => (
              <EventCard key={index} event={event} />
            ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Joined Events</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {joinedEventsFiltered &&
            joinedEventsFiltered.map((event: any, index: number) => (
              <EventCard key={index} event={event} showStatus />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function EventCard({
  event,
  showStatus,
}: {
  event: any;
  showStatus?: boolean;
}) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Card className='overflow-hidden'>
        <CardHeader className='bg-gradient-to-r from-primary/10 to-purple-600/10 p-4'>
          <CardTitle className='text-xl font-semibold truncate'>
            {event.name}
            {showStatus ? (
              <Badge>{event.isApproved ? "Approved" : "Pending"}</Badge>
            ) : null}
            {
              <p>
                <span className='text-sm text-muted-foreground'>
                  by {event.creator}
                </span>
              </p>
            }
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
            <Button className='w-full'>View Details</Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
