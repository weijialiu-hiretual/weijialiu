author='weijia'
ticket='CMR-9901'
filename='mysql/hiretual/flyway/V112__CMR-9901.sql'
sql='alter table EMAIL_THREAD
add index idx_project_id(email_thread_project_id);'
commit_message='Add index idx_project_id in EMAIL_THREAD table'

git checkout master
git pull
git checkout -b $author/$ticket
touch $filename
echo $sql > $filename
git add $filename
git commit -m "$ticket $commit_message"
git push origin $author/$ticket --force

git checkout release
git pull
git checkout -b from-release/$author/$ticket
# 获取 master 分支最近一个提交的哈希值
LAST_COMMIT=$(git log $author/${ticket} -1 --format=format:%H)
echo $LAST_COMMIT
# 将 master 分支最近一个提交的内容 Cherry-pick 到 当前分支
git cherry-pick $LAST_COMMIT
git push origin from-release/$author/$ticket --force

git checkout develop
git pull
git checkout -b from-develop/$author/$ticket
# 获取 master 分支最近一个提交的哈希值
LAST_COMMIT=$(git log $author/${ticket} -1 --format=format:%H)
echo $LAST_COMMIT
# 将 master 分支最近一个提交的内容 Cherry-pick 到 当前分支
git cherry-pick $LAST_COMMIT
git push origin from-develop/$author/$ticket --force

# 输出三个PR的链接
# https://github.com/HireTeamMate/databases/compare/master...weijia/CMR-9414
echo "https://github.com/HireTeamMate/databases/compare/master...$author/$ticket"
echo "https://github.com/HireTeamMate/databases/compare/release...from-release/$author/$ticket"
echo "https://github.com/HireTeamMate/databases/compare/develop...from-develop/$author/$ticket"