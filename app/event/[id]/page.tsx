"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { EVENT_MANAGER_ADDRESS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  useReadProjectGetAttendees,
  useWriteProjectApproveAttendee,
  useWriteProjectJoinEvent,
  useWriteProjectRemoveEvent,
} from "@/hooks/contracts/generated/project";
import { formatDynamicEventData, getMergedHash } from "@/lib/data";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UserIcon, InfoIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [secretCode, setSecretCode] = useState("");
  const searchParams = useSearchParams();
  const event = JSON.parse(searchParams.get("eventData") || "{}");
  const { address } = useAccount();

  const {
    data: attendees,
    isLoading,
    isError,
  } = useReadProjectGetAttendees({
    address: EVENT_MANAGER_ADDRESS,
    args: [id as string],
    query: {
      select(data) {
        return formatDynamicEventData(data, [
          "username",
          "secretCorrect",
          "approved",
          "walletAddress",
        ]);
      },
    },
  });

  const { writeContractAsync: approveAttendee } =
    useWriteProjectApproveAttendee();
  const { writeContractAsync: joinEvent, isPending: joiningEvent } =
    useWriteProjectJoinEvent();
  const { writeContractAsync: removeEvent } = useWriteProjectRemoveEvent();

  if (isLoading)
    return <div className='text-center py-8'>Loading event details...</div>;
  if (isError)
    return (
      <div className='text-center py-8 text-red-500'>
        Error loading event details
      </div>
    );

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
        Event Details
      </motion.h1>

      <Card className='mb-8'>
        <CardHeader className='bg-gradient-to-r from-primary/10 to-purple-600/10'>
          <CardTitle className='text-2xl font-semibold'>{event.name}</CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex items-center space-x-2 text-muted-foreground'>
              <MapPinIcon className='w-5 h-5' />
              <p>{event.location}</p>
            </div>
            <div className='flex items-center space-x-2 text-muted-foreground'>
              <CalendarIcon className='w-5 h-5' />
              <p>{event.date}</p>
            </div>
          </div>
          <div className='mt-4 flex items-center space-x-2 text-muted-foreground'>
            <InfoIcon className='w-5 h-5' />
            <p>{event.description}</p>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>Join Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex space-x-4'>
            <Input
              type='password'
              placeholder='Enter Secret Code'
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
            />
            <Button
              disabled={joiningEvent}
              onClick={() =>
                joinEvent({
                  address: EVENT_MANAGER_ADDRESS,
                  args: [id as string, getMergedHash(address, secretCode)],
                })
              }>
              {joiningEvent ? "Joining..." : "Join"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>Attendees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Secret Correct</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees &&
                attendees.map((attendee: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className='flex items-center space-x-2'>
                      <Avatar className='w-8 h-8'>
                        <AvatarFallback>
                          {attendee.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{attendee.username}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          attendee.approved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {attendee.approved ? "Approved" : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          attendee.secretCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {attendee.secretCorrect ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {!attendee.approved && (
                        <Button
                          size='sm'
                          onClick={async () => {
                            await approveAttendee({
                              address: EVENT_MANAGER_ADDRESS,
                              args: [id as string, attendee.walletAddress],
                            });
                          }}>
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        <Button
          variant='destructive'
          onClick={() => removeEvent()}
          className='w-full'>
          Remove Event
        </Button>
      </motion.div>
    </motion.div>
  );
}
