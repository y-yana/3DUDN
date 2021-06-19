FROM python:3.6

ARG project_dir=/projects/

ADD src/requirements.txt $project_dir

WORKDIR $project_dir

# install heroku cli
RUN curl https://cli-assets.heroku.com/install.sh | sh

RUN pip install -r requirements.txt

ENV FLASK_APP 'app.py'

CMD gunicorn --bind 0.0.0.0:$PORT wsgi