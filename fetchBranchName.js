import { info, setFailed, startGroup, endGroup } from "@actions/core";
import { context } from "@actions/github";
import { Octokit } from "@octokit/core";

const auth = process.env.REPO_TOKEN;

const octokit = new Octokit({ auth });

const { payload: { repository: { owner: { login }, name, default_branch } }, sha } = context;

let response, branchName;

startGroup("Fetching branches-where-head");
info("Owner:" + login);
info("Repo name:" + name);
info("Sha:" + sha);

try {
  response = await octokit.request('GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head', {
    owner: login,
    repo: name,
    commit_sha: sha
  })
} catch (err) {
  setFailed(`GitHub API request failed with error ${err}`);
}

if (response && response.data && response.data.length >= 1) {
  branchName = response.data[0].name === default_branch ? "" : response.data[0].name;
} else {
  branchName = "";
}

info("Sha:" + branchName);
endGroup();

export { branchName };