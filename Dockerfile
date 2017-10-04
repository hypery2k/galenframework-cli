FROM selenium/standalone-chrome

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.11.4
ENV GALEN_VERSION 2.3.5
ENV TEST_HOME /var/jenkins_home

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g galenframework-cli@$GALEN_VERSION

VOLUME /var/test_scripts

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH
