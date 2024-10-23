author='weijia'
ticket='CMR-9936'
filename='mysql/hiretual/flyway/CMR-9936.sql'
sql='EMAIL_THREAD_CANDIDATE
ADD COLUMN sequence_step_count INT DEFAULT 0 NOT NULL'
commit_message='Add column sequence_step_count in EMAIL_THREAD_CANDIDATE table'

git checkout master
git pull
git checkout -b $author/$ticket
touch $filename
echo $sql > $filename
git add $filename
git commit -m "$ticket $commit_message"
git push origin $author/$ticket --force


#
# to release
#
git checkout release
git pull
git checkout -b from-release/$author/$ticket
# Get the hash value of the most recent commit on the ${author}/${ticket} branch
LAST_COMMIT=$(git log $author/${ticket} -1 --format=format:%H)
echo $LAST_COMMIT
# Cherry-pick this commit to the current branch
git cherry-pick $LAST_COMMIT
git push origin from-release/$author/$ticket --force

#
# to develop
#
git checkout develop
git pull
git checkout -b from-develop/$author/$ticket

# Get the hash value of the most recent commit on the ${author}/${ticket} branch
LAST_COMMIT=$(git log $author/${ticket} -1 --format=format:%H)
echo $LAST_COMMIT
# Cherry-pick this commit to the current branch
git cherry-pick $LAST_COMMIT
git push origin from-develop/$author/$ticket --force

echo "=========================== PR links ==========================="

# Print the PR links
echo "https://github.com/HireTeamMate/databases/compare/master...$author/$ticket"
echo "https://github.com/HireTeamMate/databases/compare/release...from-release/$author/$ticket"
echo "https://github.com/HireTeamMate/databases/compare/develop...from-develop/$author/$ticket"


echo "=========================== Will create PRs by gh ==========================="

# Create PRs
master_pr_url=$(gh pr create --base master --head $author/$ticket --title "$ticket $commit_message" --body "")
release_pr_url=$(gh pr create --base release --head from-release/$author/$ticket --title "$ticket $commit_message" --body "")
develop_pr_url=$(gh pr create --base develop --head from-develop/$author/$ticket --title "$ticket $commit_message" --body "")

# Print the PR links
# print the CMR ticket https://hiretual.atlassian.net/browse/CMR-9936
echo "https://hiretual.atlassian.net/browse/$ticket"

# print the commit_message
echo "$commit_message"

# Print the PR links
echo "-> master: $master_pr_url"
echo "-> release: $release_pr_url"
echo "-> develop: $develop_pr_url"