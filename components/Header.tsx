"use client";

import { useReadProjectUsernamesByWallet } from "@/hooks/contracts/generated/project";
import { EVENT_MANAGER_ADDRESS } from "@/lib/constants";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  FileWarningIcon,
  HomeIcon,
  PlusCircleIcon,
  TriangleAlert,
  UserIcon,
} from "lucide-react";

export default function Header() {
  const { address } = useAccount();

  const { data: createdUsername } = useReadProjectUsernamesByWallet({
    address: EVENT_MANAGER_ADDRESS,
    args: [address],
  });

  const navItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/create-event", label: "Create Event", icon: PlusCircleIcon },
    { href: "/profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <motion.header
      className='bg-background border-b border-border'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <nav>
          <ul className='flex space-x-6'>
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link
                  href={item.href}
                  className='flex items-center text-muted-foreground hover:text-primary transition-colors duration-200'>
                  <item.icon className='w-5 h-5 mr-2' />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className='flex items-center space-x-4'>
          {address ? (
            createdUsername ? (
              <Button variant='outline' className='font-semibold'>
                {createdUsername}
              </Button>
            ) : (
              <Link href='/profile'>
                <Button
                  variant='outline'
                  className='font-semibold border-orange-400'>
                  <TriangleAlert className='w-5 h-5 text-warning' />
                  Create Username
                </Button>
              </Link>
            )
          ) : null}
          <ConnectKitButton />
        </div>
      </div>
    </motion.header>
  );
}
