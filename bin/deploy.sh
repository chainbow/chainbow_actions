git pull -r --autostash

# 切换到main分支
git switch main

docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d

# docker exec -it action_demo pnpm db:push
