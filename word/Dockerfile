FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV TZ=Asia/Seoul

WORKDIR /word

# 먼저 requirements.txt만 복사
COPY requirements.txt requirements.txt

RUN apt-get update
RUN apt-get install -y netcat-openbsd

# Set the timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 그 다음에 나머지 파일들 복사
COPY . .

RUN chmod +x /word/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/word/entrypoint.sh"]
