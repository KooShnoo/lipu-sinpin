class StaticPagesController < ActionController::Base
  skip_before_action :verify_authenticity_token
  def frontend_index
    Analytic.first.increment! :page_serves
    # render text: "hehe"
    render file: Rails.root.join('public_', 'index.html')
  end

  def frontend_other
    # render file: Rails.root.join('public_', request.env['PATH_INFO'])
    # send_file Rails.root.join('public_', request.env['PATH_INFO'])
    send_file "public_#{request.env['PATH_INFO']}"
  end
end
