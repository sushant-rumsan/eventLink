import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Project
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const projectAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'uniqueCode', internalType: 'string', type: 'string' },
      { name: 'attendee', internalType: 'address', type: 'address' },
    ],
    name: 'approveAttendee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'uniqueCode',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'attendee',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AttendeeApproved',
  },
  {
    type: 'function',
    inputs: [
      { name: 'uniqueCode', internalType: 'string', type: 'string' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'location', internalType: 'string', type: 'string' },
      { name: 'date', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'secretHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'createEvent',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'username', internalType: 'string', type: 'string' }],
    name: 'createUsername',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'uniqueCode',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'EventCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'uniqueCode',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'EventRemoved',
  },
  {
    type: 'function',
    inputs: [
      { name: 'uniqueCode', internalType: 'string', type: 'string' },
      { name: 'providedHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'joinEvent',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'uniqueCode', internalType: 'string', type: 'string' }],
    name: 'removeEvent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getActiveEvents',
    outputs: [
      { name: 'creator', internalType: 'address[]', type: 'address[]' },
      { name: 'uniqueCodes', internalType: 'string[]', type: 'string[]' },
      { name: 'names', internalType: 'string[]', type: 'string[]' },
      { name: 'locations', internalType: 'string[]', type: 'string[]' },
      { name: 'dates', internalType: 'string[]', type: 'string[]' },
      { name: 'descriptions', internalType: 'string[]', type: 'string[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'uniqueCode', internalType: 'string', type: 'string' }],
    name: 'getAttendees',
    outputs: [
      { name: 'usernames', internalType: 'string[]', type: 'string[]' },
      { name: 'secretCorrectFlags', internalType: 'bool[]', type: 'bool[]' },
      { name: 'approvalFlags', internalType: 'bool[]', type: 'bool[]' },
      { name: 'walletAddresses', internalType: 'address[]', type: 'address[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'wallet', internalType: 'address', type: 'address' }],
    name: 'getJoinedEvents',
    outputs: [
      {
        name: '',
        internalType: 'struct EventManager.JoinedEvent[]',
        type: 'tuple[]',
        components: [
          { name: 'eventId', internalType: 'string', type: 'string' },
          { name: 'isApproved', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'usernamesByWallet',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__
 */
export const useReadProject = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getActiveEvents"`
 */
export const useReadProjectGetActiveEvents =
  /*#__PURE__*/ createUseReadContract({
    abi: projectAbi,
    functionName: 'getActiveEvents',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getAttendees"`
 */
export const useReadProjectGetAttendees = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'getAttendees',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getJoinedEvents"`
 */
export const useReadProjectGetJoinedEvents =
  /*#__PURE__*/ createUseReadContract({
    abi: projectAbi,
    functionName: 'getJoinedEvents',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"usernamesByWallet"`
 */
export const useReadProjectUsernamesByWallet =
  /*#__PURE__*/ createUseReadContract({
    abi: projectAbi,
    functionName: 'usernamesByWallet',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__
 */
export const useWriteProject = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"approveAttendee"`
 */
export const useWriteProjectApproveAttendee =
  /*#__PURE__*/ createUseWriteContract({
    abi: projectAbi,
    functionName: 'approveAttendee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"createEvent"`
 */
export const useWriteProjectCreateEvent = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
  functionName: 'createEvent',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"createUsername"`
 */
export const useWriteProjectCreateUsername =
  /*#__PURE__*/ createUseWriteContract({
    abi: projectAbi,
    functionName: 'createUsername',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"joinEvent"`
 */
export const useWriteProjectJoinEvent = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
  functionName: 'joinEvent',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"removeEvent"`
 */
export const useWriteProjectRemoveEvent = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
  functionName: 'removeEvent',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__
 */
export const useSimulateProject = /*#__PURE__*/ createUseSimulateContract({
  abi: projectAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"approveAttendee"`
 */
export const useSimulateProjectApproveAttendee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: projectAbi,
    functionName: 'approveAttendee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"createEvent"`
 */
export const useSimulateProjectCreateEvent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: projectAbi,
    functionName: 'createEvent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"createUsername"`
 */
export const useSimulateProjectCreateUsername =
  /*#__PURE__*/ createUseSimulateContract({
    abi: projectAbi,
    functionName: 'createUsername',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"joinEvent"`
 */
export const useSimulateProjectJoinEvent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: projectAbi,
    functionName: 'joinEvent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"removeEvent"`
 */
export const useSimulateProjectRemoveEvent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: projectAbi,
    functionName: 'removeEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__
 */
export const useWatchProjectEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: projectAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__ and `eventName` set to `"AttendeeApproved"`
 */
export const useWatchProjectAttendeeApprovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: projectAbi,
    eventName: 'AttendeeApproved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__ and `eventName` set to `"EventCreated"`
 */
export const useWatchProjectEventCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: projectAbi,
    eventName: 'EventCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__ and `eventName` set to `"EventRemoved"`
 */
export const useWatchProjectEventRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: projectAbi,
    eventName: 'EventRemoved',
  })
