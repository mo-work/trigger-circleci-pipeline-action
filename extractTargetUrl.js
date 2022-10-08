import { getInput } from "@actions/core";

const REGEX = /\[Visit Preview\]\((https:\/\/[\w-]+-team-mo.vercel.app)\)/

const body = getInput("VERCEL_COMMEMT_BODY");

const match = REGEX.exec(body)[1];

const extractTargetUrl = () => (
    match ? match : ""
);

export default extractTargetUrl;
