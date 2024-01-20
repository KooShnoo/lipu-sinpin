class StaticPagesController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def frontend_index
    Analytic.first.increment! :page_serves
    render file: Rails.root.join('public_', 'index.html')
  end

  def frontend_other
    fpath = "public_#{request.env['PATH_INFO']}"
    if File.file?(fpath)
      send_file fpath
    else
      frontend_index
    end
  end
end
