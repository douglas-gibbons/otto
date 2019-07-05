FROM jguyomard/hugo-builder as hugo

# NOTE: if running this locally you'll need to run this to pick up the themes:
# git submodule init
# git submodule update

WORKDIR /src
COPY . .
RUN hugo

FROM nginx
COPY --from=hugo /src/public/. /usr/share/nginx/html/
