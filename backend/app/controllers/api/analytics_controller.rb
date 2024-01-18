# rubocop:disable Style/ClassAndModuleChildren
class Api::AnalyticsController < ApplicationController
  def show
    @analytics = Analytic.first
  end
end
# rubocop:enable Style/ClassAndModuleChildren
