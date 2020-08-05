import { readFileSync, writeFileSync } from 'fs';
import readlineSync from 'readline-sync';
const Path = '.git/COMMIT_EDITMSG';
const Pattern = /DBTOOL-\d{1,5}/u;
const TaskUrlPrefix = 'https://bharat-tech-labs.atlassian.net/browse/';
const getIssueID = (issueString) => {
  if (issueString.match(Pattern)) {
    return issueString.match(Pattern)[0];
  }
  return null;
};
let commitMessage = readFileSync(
  Path,
  'utf-8'
);
const commitMessageBlocks = commitMessage.split('\n').filter(Boolean);
const inputIssueString = commitMessageBlocks[commitMessageBlocks.length - 1];
let issueID = getIssueID(inputIssueString);
if (!issueID) {
  while (true) {
    console.error('Cannot commit, invalid issue reference!');
    const issueString = readlineSync.question('Please re-enter issue reference: ');
    issueID = getIssueID(issueString);
    if (issueID) {
      break;
    }
  }
}
const taskUrl = TaskUrlPrefix + issueID;
commitMessageBlocks.pop();
commitMessageBlocks.push(taskUrl);
commitMessageBlocks.splice(
  1,
  0,
  '\n'
);
commitMessage = commitMessageBlocks.join('\n');
writeFileSync(
  Path,
  commitMessage
);