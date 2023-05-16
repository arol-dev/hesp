cd /Developer/hesp
yarn prisma migrate reset
cd apps/hesp
yarn prisma db seed
cd ../..
yarn run dev &
cd apps/hesp
yarn cypress open



