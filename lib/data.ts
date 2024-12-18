import { ethers } from "ethers";

type InputData = string[][];

type FormattedData = {
  slug: string;
  name: string;
  location: string;
  date: string;
  description: string;
};

type FormatDataManually = string[];

// Utility function to dynamically format data into structured objects
export function formatDynamicEventData(
  input: InputData,
  formatTo?: FormatDataManually
): FormattedData[] {
  const result: FormattedData[] = [];

  // Ensure the input array has the correct number of rows (5 in this case)
  const numberOfColumns = input[0].length;

  for (let i = 0; i < numberOfColumns; i++) {
    const formattedData: any = {};

    if (formatTo) {
      formatTo.forEach((key, index) => {
        formattedData[key] = input[index][i];
      });
    } else {
      formattedData.creator = input[0][i]; // Creator (first column)
      formattedData.slug = input[1][i]; // Slug (first column)
      formattedData.name = input[2][i]; // Name (second column)
      formattedData.location = input[3][i]; // Location (third column)
      formattedData.date = input[4][i]; // Date (fourth column)
      formattedData.description = input[5][i]; // Description (fifth column)
    }

    result.push(formattedData as FormattedData);
  }

  return result;
}

export const getMergedHash = (msgSender: string, eventSecret: string) => {
  const secretHash = getSingleHash(eventSecret);

  return ethers.keccak256(ethers.concat([secretHash, msgSender]));
};

export const getSingleHash = (inputText: string) => {
  return ethers.keccak256(ethers.toUtf8Bytes(inputText));
};
