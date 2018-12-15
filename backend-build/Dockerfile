FROM amazonlinux:2018.03.0.20180827

ENV OTP_VERSION="21.1.4"
ENV ELIXIR_VERSION="1.7.4"
ENV PHOENIX_VERSION="1.4.0"

# Install development tools
RUN yum -y groupinstall "Development Tools"
RUN yum -y install ncurses-devel
RUN yum -y install bash git

# Make work directory.
WORKDIR /home/setup

# Install erlang depended packages.
RUN yum -y install ncurses ncurses-devel openssl openssl-devel gcc-c++ unixODBC unixODBC-devel fop *openjdk-devel inotify-tools autoconf
#RUN yum -y --enablerepo=epel install inotify-tools

# Install Erlang
RUN yum -y install wget
RUN wget https://github.com/erlang/otp/archive/OTP-${OTP_VERSION}.tar.gz
RUN tar zxvf OTP-${OTP_VERSION}.tar.gz
RUN cd otp-OTP-${OTP_VERSION} && \
    ./otp_build autoconf && \
    ./configure && \
    make && \
    make install

# Install Elixir
#RUN wget https://github.com/elixir-lang/elixir/releases/download/v${ELIXIR_VERSION}/Precompiled.zip
RUN wget https://github.com/elixir-lang/elixir/archive/v${ELIXIR_VERSION}.tar.gz
RUN tar zxvf v${ELIXIR_VERSION}.tar.gz
RUN cd elixir-${ELIXIR_VERSION} && make && make install
RUN export "PATH=/usr/local/bin:$PATH" >> ~/.profile
RUN export "PATH=/usr/local/bin:$PATH" >> ~/.profile
RUN touch ~/.shrc && source ~/.shrc
# Install Hex
RUN mix local.hex --force
# Install Rebar3
RUN mix local.rebar --force
# Install Phoenix
RUN mix archive.install hex phx_new ${PHOENIX_VERSION} --force

WORKDIR /app