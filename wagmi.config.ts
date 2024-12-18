import { defineConfig } from '@wagmi/cli'
import { react } from "@wagmi/cli/plugins";
import { abi } from './contract/abi';

export default defineConfig({
  out: "hooks/contracts/generated/project.ts",
  contracts: [
    {
      name: "Project",
      abi,
    },
  ],
  plugins: [react()],
},)
