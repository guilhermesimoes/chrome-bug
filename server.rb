require 'sinatra/base'
require 'sinatra/reloader' if development?

class Server < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    erb <<-HTML
      <p>You are on page 0</p>
      <p>Go to page 1</p>
    HTML
  end

  get '/page1', :provides => [:html, :js] do
    if request.xhr?
      response.headers['Vary'] = 'Accept' if params[:vary]
      content_type 'text/javascript'
      <<-TEXT
        $('#js-content').html('<p>You are on page 1</p><p>Go to page 2</p>');
      TEXT
    else
      erb <<-HTML
        <p>You are on page 1, but it was not loaded using ajax.</p>
        <p>Go back to <a href='/'>page 0</a> and start over.</p>
      HTML
    end
  end

  get '/page2' do
    erb <<-HTML
      <p>You are on page 2</p>
      <p>Now click the back button!</p>
    HTML
  end
end
