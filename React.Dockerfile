# docker build --file Webpack.Dockerfile --tag poker-react .
# docker run --tty --interactive --volume $PWD/frontend/:/poker/frontend/ poker-react bash
# docker run --volume $PWD/frontend/:/poker/frontend/ -p 3000:3000 poker-react npm dev

FROM node:latest

RUN mkdir /poker/

WORKDIR /poker/

COPY frontend/ frontend/
COPY scripts/ scripts/

EXPOSE 3000

ENTRYPOINT ["./scripts/react-entrypoint.sh"]