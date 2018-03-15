class ApplicationController < ActionController::Base
  include Clearance::Controller
  include Clearance::Authentication
  
  protect_from_forgery with: :exception
  before_action :initialize_errors # ensure the @errors array exists for ALL controller actions

  def authenticate(params)
    User.authenticate(params[:session][:username],
                      params[:session][:password])
  end

  private

  def initialize_errors
    @errors = []
  end
end
