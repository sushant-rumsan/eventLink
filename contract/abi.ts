export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
      {
        internalType: "address",
        name: "attendee",
        type: "address",
      },
    ],
    name: "approveAttendee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "attendee",
        type: "address",
      },
    ],
    name: "AttendeeApproved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "secretHash",
        type: "bytes32",
      },
    ],
    name: "createEvent",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "createUsername",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "EventCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "EventRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "providedHash",
        type: "bytes32",
      },
    ],
    name: "joinEvent",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
    ],
    name: "removeEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveEvents",
    outputs: [
      {
        internalType: "address[]",
        name: "creator",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "uniqueCodes",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "locations",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "dates",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "descriptions",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uniqueCode",
        type: "string",
      },
    ],
    name: "getAttendees",
    outputs: [
      {
        internalType: "string[]",
        name: "usernames",
        type: "string[]",
      },
      {
        internalType: "bool[]",
        name: "secretCorrectFlags",
        type: "bool[]",
      },
      {
        internalType: "bool[]",
        name: "approvalFlags",
        type: "bool[]",
      },
      {
        internalType: "address[]",
        name: "walletAddresses",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
    ],
    name: "getJoinedEvents",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "eventId",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isApproved",
            type: "bool",
          },
        ],
        internalType: "struct EventManager.JoinedEvent[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "usernamesByWallet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
