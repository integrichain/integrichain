class ApplicationController < ActionController::Base
  include Clearance::Controller
  protect_from_forgery with: :exception
  before_action :initialize_errors # ensure the @errors array exists for ALL controller actions

  private

  def initialize_errors
    @errors = []
  end
end
