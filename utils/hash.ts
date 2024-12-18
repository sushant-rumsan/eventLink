import {ethers} from "ethers";

export const getMergedHash = (msgSender: string, eventSecret: string) => {

    const secretHash = getSingleHash(eventSecret);

    return ethers.keccak256(
        ethers.concat([
        secretHash,
        msgSender
        ])
    );
}

export const getSingleHash = (inputText: string) => {
    return ethers.keccak256(ethers.toUtf8Bytes(inputText))
}
