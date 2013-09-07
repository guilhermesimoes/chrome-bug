# This file is used by Rack-based servers to start the application.

require 'bundler'

Bundler.require(:default, ENV['RACK_ENV'].to_sym)

use Rack::Deflater

require './server'

run Server
